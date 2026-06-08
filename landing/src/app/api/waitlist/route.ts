import { NextResponse, type NextRequest } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db';

// DB-backed: never prerender at build time.
export const dynamic = 'force-dynamic';

/** Total early-access spots — must match the "of 500" copy in the form UI. */
const WAITLIST_CAP = 500;

const SPEND_BRACKETS = new Set(['under_500', '500_5k', '5k_50k', '50k_plus']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';

/** 8-char URL-safe referral code (no ambiguous chars like 0/O/1/I/l). */
function generateCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  let out = '';
  for (const b of bytes) out += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return out;
}

/** Canonical site origin for building shareable referral links. */
function siteOrigin(request: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, '');
  return new URL(request.url).origin;
}

/**
 * Position is derived, not stored: you rank ahead of someone if you have more
 * referrals, or the same number but signed up earlier. So every referral that
 * lands genuinely moves the referrer up the queue.
 */
async function getRank(email: string): Promise<{ position: number; referralCount: number }> {
  const rows = (await db.execute(sql`
    WITH ref_counts AS (
      SELECT
        w.email,
        w.created_at,
        (SELECT count(*) FROM ${schema.waitlist} r WHERE r.referred_by = w.referral_code) AS ref_count
      FROM ${schema.waitlist} w
    )
    SELECT
      a.ref_count AS ref_count,
      (SELECT count(*) FROM ref_counts b
        WHERE b.ref_count > a.ref_count
           OR (b.ref_count = a.ref_count AND b.created_at < a.created_at)) + 1 AS position
    FROM ref_counts a
    WHERE a.email = ${email}
  `)) as unknown as { rows: { ref_count: number; position: number }[] };

  const row = rows.rows?.[0];
  return {
    position: Number(row?.position ?? 0),
    referralCount: Number(row?.ref_count ?? 0),
  };
}

async function totalSignups(): Promise<number> {
  const res = (await db.execute(
    sql`SELECT count(*)::int AS total FROM ${schema.waitlist}`,
  )) as unknown as { rows: { total: number }[] };
  return Number(res.rows?.[0]?.total ?? 0);
}

/**
 * GET /api/waitlist          → live spots counter
 * GET /api/waitlist?email=…  → look up an existing member's spot (never creates)
 */
export async function GET(request: NextRequest) {
  try {
    const emailParam = request.nextUrl.searchParams.get('email')?.trim().toLowerCase();

    // Position lookup for a returning visitor — read-only, no insert.
    if (emailParam) {
      if (!EMAIL_RE.test(emailParam)) {
        return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
      }
      const row = await db
        .select({ referralCode: schema.waitlist.referralCode })
        .from(schema.waitlist)
        .where(eq(schema.waitlist.email, emailParam))
        .limit(1);

      if (row.length === 0) {
        return NextResponse.json({ found: false });
      }
      const { position, referralCount } = await getRank(emailParam);
      return NextResponse.json({
        found: true,
        position,
        referral_count: referralCount,
        referral_link: `${siteOrigin(request)}/?ref=${row[0].referralCode}`,
      });
    }

    const total = await totalSignups();
    return NextResponse.json({
      total,
      cap: WAITLIST_CAP,
      spotsLeft: Math.max(0, WAITLIST_CAP - total),
    });
  } catch {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}

/** POST /api/waitlist → join (or look up) the waitlist. Idempotent by email. */
export async function POST(request: NextRequest) {
  let body: { email?: string; spendBracket?: string; ref?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? '';
  const spendBracket =
    body.spendBracket && SPEND_BRACKETS.has(body.spendBracket) ? body.spendBracket : null;
  const ref = body.ref?.trim() || null;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 });
  }

  const origin = siteOrigin(request);
  const linkFor = (code: string) => `${origin}/?ref=${code}`;

  try {
    // Returning visitor: same email just shows their existing spot.
    const existing = await db
      .select({ referralCode: schema.waitlist.referralCode })
      .from(schema.waitlist)
      .where(eq(schema.waitlist.email, email))
      .limit(1);

    if (existing.length > 0) {
      const { position, referralCount } = await getRank(email);
      return NextResponse.json({
        position,
        referral_count: referralCount,
        referral_link: linkFor(existing[0].referralCode),
        already_joined: true,
      });
    }

    // Only credit a referral if the code belongs to a real, different member.
    let referredBy: string | null = null;
    if (ref) {
      const referrer = await db
        .select({ email: schema.waitlist.email })
        .from(schema.waitlist)
        .where(eq(schema.waitlist.referralCode, ref))
        .limit(1);
      if (referrer.length > 0 && referrer[0].email !== email) referredBy = ref;
    }

    // Insert with a fresh code, retrying on the rare code collision.
    let code = generateCode();
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        await db.insert(schema.waitlist).values({ email, spendBracket, referralCode: code, referredBy });
        break;
      } catch (err) {
        const msg = err instanceof Error ? err.message : '';
        // Email already taken (race with a concurrent submit) → treat as returning.
        if (msg.includes('email')) {
          const { position, referralCount } = await getRank(email);
          const row = await db
            .select({ referralCode: schema.waitlist.referralCode })
            .from(schema.waitlist)
            .where(eq(schema.waitlist.email, email))
            .limit(1);
          return NextResponse.json({
            position,
            referral_count: referralCount,
            referral_link: linkFor(row[0]?.referralCode ?? code),
            already_joined: true,
          });
        }
        // Referral code collision → try a new one.
        if (msg.includes('referral_code') && attempt < 4) {
          code = generateCode();
          continue;
        }
        throw err;
      }
    }

    const { position, referralCount } = await getRank(email);
    return NextResponse.json({
      position,
      referral_count: referralCount,
      referral_link: linkFor(code),
      already_joined: false,
    });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
