'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sliders, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

// Provider logos rendered on a small light chip — the canonical pricing-table
// treatment. The chip also lets the Mistral mosaic (which has dark cells) read
// correctly against the dark comparison card.
function ProviderChip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'grid', placeItems: 'center', flexShrink: 0,
      width: '24px', height: '24px', borderRadius: '6px',
      background: '#FFFFFF',
    }}>
      {children}
    </span>
  );
}

function OpenAIMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 260" aria-hidden="true">
      <path fill="#000" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/>
    </svg>
  );
}

function MistralMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 256 233" aria-hidden="true">
      <path d="M186.18182 0h46.54545v46.54545h-46.54545z"/>
      <path fill="#F7D046" d="M209.45454 0h46.54545v46.54545h-46.54545z"/>
      <path d="M0 0h46.54545v46.54545H0zM0 46.54545h46.54545V93.0909H0zM0 93.09091h46.54545v46.54545H0zM0 139.63636h46.54545v46.54545H0zM0 186.18182h46.54545v46.54545H0z"/>
      <path fill="#F7D046" d="M23.27273 0h46.54545v46.54545H23.27273z"/>
      <path fill="#F2A73B" d="M209.45454 46.54545h46.54545V93.0909h-46.54545zM23.27273 46.54545h46.54545V93.0909H23.27273z"/>
      <path d="M139.63636 46.54545h46.54545V93.0909h-46.54545z"/>
      <path fill="#F2A73B" d="M162.90909 46.54545h46.54545V93.0909h-46.54545zM69.81818 46.54545h46.54545V93.0909H69.81818z"/>
      <path fill="#EE792F" d="M116.36364 93.09091h46.54545v46.54545h-46.54545zM162.90909 93.09091h46.54545v46.54545h-46.54545zM69.81818 93.09091h46.54545v46.54545H69.81818z"/>
      <path d="M93.09091 139.63636h46.54545v46.54545H93.09091z"/>
      <path fill="#EB5829" d="M116.36364 139.63636h46.54545v46.54545h-46.54545z"/>
      <path fill="#EE792F" d="M209.45454 93.09091h46.54545v46.54545h-46.54545zM23.27273 93.09091h46.54545v46.54545H23.27273z"/>
      <path d="M186.18182 139.63636h46.54545v46.54545h-46.54545z"/>
      <path fill="#EB5829" d="M209.45454 139.63636h46.54545v46.54545h-46.54545z"/>
      <path d="M186.18182 186.18182h46.54545v46.54545h-46.54545z"/>
      <path fill="#EB5829" d="M23.27273 139.63636h46.54545v46.54545H23.27273z"/>
      <path fill="#EA3326" d="M209.45454 186.18182h46.54545v46.54545h-46.54545zM23.27273 186.18182h46.54545v46.54545H23.27273z"/>
    </svg>
  );
}

type TierId = 'sm' | 'md' | 'lg';

interface TierData {
  id: TierId;
  label: string;
  subtitle: string;
  gpt4o: number;
  mistral: number;
  savings: number;
}

const TIERS: TierData[] = [
  { id: 'sm',  label: '10M / mo',  subtitle: '10M tokens / month',  gpt4o: 150,    mistral: 30,    savings: 120    },
  { id: 'md',  label: '100M / mo', subtitle: '100M tokens / month', gpt4o: 1_500,  mistral: 300,   savings: 1_200  },
  { id: 'lg',  label: '1B / mo',   subtitle: '1B tokens / month',   gpt4o: 15_000, mistral: 3_000, savings: 12_000 },
];

const TIER_MAP = Object.fromEntries(TIERS.map(t => [t.id, t])) as Record<TierId, TierData>;

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit:    { opacity: 0, transition: { duration: 0.13 } },
};

const slide = {
  hidden:  { opacity: 0, y: 18, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { type: 'spring' as const, stiffness: 120, damping: 20 } },
  exit:    { opacity: 0, y: -10, filter: 'blur(5px)' },
};

// Reduced-motion alternative: crossfade only, no transform or blur
const reducedStagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
  exit:    { opacity: 0, transition: { duration: 0.12 } },
};
const reducedSlide = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.12 } },
};

function fmt(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `$${n}`;
}

export default function MathTrust() {
  const [active, setActive] = useState<TierId>('md');
  const tier = TIER_MAP[active];
  const reduce = useReducedMotion();
  const staggerV = reduce ? reducedStagger : stagger;
  const slideV = reduce ? reducedSlide : slide;

  return (
    <section
      id="pricing"
      className="lp-sec lp-math"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Section-wide background glow (like BackgroundGradient in the reference) ── */}
      <motion.div
        animate={reduce ? { opacity: 0.85 } : { opacity: [0.7, 1, 0.7] }}
        transition={reduce ? undefined : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 26% 58%, rgba(0,229,153,0.20) 0%, rgba(0,229,153,0.06) 42%, transparent 62%)',
        }}
      />

      <div className="lp-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <p className="lp-section-label">The math</p>
          <h2 style={{
            fontSize: 'clamp(22px, 2.4vw, 34px)',
            fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1,
            margin: '0 0 20px', maxWidth: '560px', textWrap: 'balance',
          } as React.CSSProperties}>
            The savings aren&apos;t a projection.<br />They&apos;re basic math.
          </h2>
        </ScrollReveal>

        {/* ── Main layout: two columns, no box ── */}
        {/* justify-center centers the whole group so leftover width splits to both
            sides instead of leaving dead space on the right.
            mt-28 (112px) clears the ring (bleeds ~66px above the row top) from the h2. */}
        <div className="flex items-center justify-center gap-32 mt-28 max-lg:flex-col max-lg:gap-14 max-lg:items-start max-lg:justify-start">

          {/* LEFT: Visual stage — no background, rings overflow freely */}
          <div className="relative shrink-0 flex flex-col items-center justify-center gap-6 max-lg:w-full">
            {/*
              Wrapper is sized by the 360px circle (no explicit size, no overflow:hidden):
              → glow: absolute inset-0 (360px), border-radius:50%, blur → naturally circular
              → outer ring: inset[-20%] = 504px, bleeds 72px past the circle on each side
              mt-18 (72px) above + gap-32 (128px) beside give the ring clearance from the
              h2 and the right column so the dashed arc never collides.
            */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              {/* Circular glow — same size as circle, naturally soft and round */}
              <motion.div
                animate={reduce ? {} : { scale: [1, 1.05, 1] }}
                transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,229,153,0.32) 0%, rgba(0,229,153,0.08) 55%, transparent 80%)',
                  filter: 'blur(48px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Outer dashed ring — inset[-20%] of 360px circle = 504px, bleeds 72px beyond */}
              <motion.div
                animate={reduce ? {} : { rotate: 360 }}
                transition={reduce ? undefined : { duration: 40, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-20%',
                  borderRadius: '50%',
                  border: '1px dashed rgba(0,229,153,0.18)',
                  pointerEvents: 'none',
                }}
              />

              {/* Inner subtle ring — same size as circle, creates a second boundary */}
              <motion.div
                animate={reduce ? {} : { rotate: -360 }}
                transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-6%',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.05)',
                  pointerEvents: 'none',
                }}
              />

              {/* The main circle */}
              <div style={{
                width: '360px', height: '360px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.20)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <motion.div
                  animate={reduce ? {} : { y: [-6, 6, -6] }}
                  transition={reduce ? undefined : { repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                  style={{ textAlign: 'center' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.75, filter: 'blur(14px)', rotate: -8 }}
                      animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1,    filter: 'blur(0px)',  rotate: 0  }}
                      exit={reduce    ? { opacity: 0 } : { opacity: 0, scale: 0.65, filter: 'blur(10px)'              }}
                      transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 260, damping: 22 }}
                      style={{ textAlign: 'center' }}
                    >
                      <div style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '52px', fontWeight: 700, letterSpacing: '-0.03em',
                        color: 'var(--accent)', lineHeight: 1,
                      }}>
                        {fmt(tier.savings)}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.55)', marginTop: '10px',
                      }}>
                        saved / mo
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Status pill */}
            <div style={{
              position: 'relative', zIndex: 1,
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--text-3)',
              background: 'rgba(11,15,20,0.8)',
              border: '1px solid var(--border-strong)',
              borderRadius: '999px', padding: '6px 14px',
              backdropFilter: 'blur(8px)',
            }}>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                background: 'var(--accent)', boxShadow: '0 0 8px rgba(0,229,153,0.7)',
                animation: 'gy-pip-pulse 2.4s ease-in-out infinite',
              }} />
              Live pricing
            </div>
          </div>

          {/* RIGHT: Info — plain, no background. Fixed width so it keeps its natural
              size; the row's justify-center balances the leftover space. */}
          <div className="shrink-0 w-[520px] pl-12 max-lg:w-full max-lg:pl-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                variants={staggerV}
                initial="hidden" animate="visible" exit="exit"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* eyebrow */}
                <motion.p variants={slideV} style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--text-3)', margin: '0 0 10px',
                }}>
                  On {tier.subtitle}
                </motion.p>

                {/* body */}
                <motion.p variants={slideV} style={{
                  color: 'var(--text-2)',
                  fontSize: '15px', lineHeight: 1.6,
                  margin: '0 0 20px', maxWidth: '420px',
                }}>
                  Routing your summarization layer from GPT-4o to Mistral Large keeps
                  output quality identical. Gantry does this per-feature, automatically.
                </motion.p>

                {/* bar card */}
                <motion.div variants={slideV} style={{
                  background: 'var(--bg-inset)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}>
                  {/* GPT-4o */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--text-0)' }}>
                        <ProviderChip><OpenAIMark /></ProviderChip>
                        GPT-4o
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.62)' }}>{fmt(tier.gpt4o)}/mo</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: '100%' }}
                        transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
                        style={{ height: '100%', background: '#F5B544', borderRadius: '999px' }}
                      />
                    </div>
                  </div>

                  {/* Mistral */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600, color: 'var(--text-0)' }}>
                        <ProviderChip><MistralMark /></ProviderChip>
                        Mistral Large
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.62)' }}>{fmt(tier.mistral)}/mo</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.07)', borderRadius: '999px', overflow: 'hidden' }}>
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: '20%' }}
                        transition={reduce ? { duration: 0 } : { duration: 0.9, delay: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
                        style={{ height: '100%', background: 'var(--accent)', borderRadius: '999px' }}
                      />
                    </div>
                  </div>

                  {/* divider + diff */}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-0)' }}>Difference</span>
                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>
                      {fmt(tier.savings)}/mo · same task tier
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      padding: 0, background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-mono, monospace)', color: 'var(--text-2)',
                      fontSize: '12px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-0)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
                  >
                    <Sliders size={13} />
                    View model catalog
                    <ChevronRight size={13} />
                  </button>
                </motion.div>

                {/* footer */}
                <motion.p variants={slideV} style={{
                  fontFamily: 'var(--font-mono, monospace)', color: 'rgba(255,255,255,0.5)',
                  fontSize: '11px', letterSpacing: '0.08em', margin: '16px 0 0',
                }}>
                  $15 / 1M tokens (GPT-4o) · $3 / 1M tokens (Mistral)
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Tier switcher ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px', padding: '5px',
            background: 'rgba(11,15,20,0.8)', border: '1px solid var(--border-strong)',
            borderRadius: '999px', backdropFilter: 'blur(12px)',
          }}>
            {TIERS.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                style={{
                  position: 'relative', padding: '7px 22px', borderRadius: '999px',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  color: active === t.id ? 'var(--text-0)' : 'var(--text-3)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '11px', letterSpacing: '0.06em', fontWeight: 500,
                  transition: 'color 0.2s',
                }}
              >
                {active === t.id && (
                  <motion.span
                    layoutId="math-tier-surface"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: '999px',
                      background: 'var(--bg-2)', border: '1px solid var(--border-strong)',
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <p className="lp-math-note">
          These are public list prices from each provider&apos;s pricing page. Your actual savings
          depend on your traffic mix and quality requirements. That&apos;s exactly what Gantry shows you.
        </p>
      </div>
    </section>
  );
}
