/**
 * Prints the waitlist in queue order (referrals desc, then signup time asc).
 * Run with: npm run db:list
 */
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Run via `npm run db:list` (loads .env).');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT
    row_number() OVER (ORDER BY ref_count DESC, created_at ASC) AS position,
    email, spend_bracket, ref_count, referred_by, created_at
  FROM (
    SELECT w.*,
      (SELECT count(*) FROM waitlist r WHERE r.referred_by = w.referral_code) AS ref_count
    FROM waitlist w
  ) t
  ORDER BY position`;

if (rows.length === 0) {
  console.log('Waitlist is empty.');
  process.exit(0);
}

console.table(
  rows.map((r) => ({
    '#': Number(r.position),
    email: r.email,
    spend: r.spend_bracket ?? '—',
    referrals: Number(r.ref_count),
    referred_by: r.referred_by ?? '—',
    joined: new Date(r.created_at).toISOString().slice(0, 16).replace('T', ' '),
  })),
);

console.log(`\nTotal: ${rows.length} of 500 spots filled.`);
