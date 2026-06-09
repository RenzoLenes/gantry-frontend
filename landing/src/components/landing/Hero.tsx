'use client';

import { useEffect, useRef, Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import WaitlistForm from '@/components/ui/WaitlistForm';
import { HeroProductPreview } from '@/components/ui/HeroProductPreview';

const Spline = lazy(() => import('@splinetool/react-spline'));

const ease = [0.22, 0.61, 0.36, 1] as const;

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

  /* fade hero content + parallax-lift the product preview on scroll */
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const y = window.scrollY;

        // fade hero text/form
        if (contentRef.current) {
          contentRef.current.style.opacity = String(1 - Math.min(y / 420, 1));
        }
        // lift the dashboard faster than scroll → "rises into view"
        if (screenshotRef.current) {
          screenshotRef.current.style.transform = `translateY(-${y * 0.18}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'relative' }}>

      {/* ════════ Hero viewport ════════ */}
      <section
        id="waitlist"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
          overflow: 'hidden',
          marginTop: '-60px', /* extend behind sticky nav */
          background: '#0B0F14',
        }}
      >
        {/* ── Spline 3D background ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
          <div style={{
            position: 'absolute', inset: 0,
            filter: 'hue-rotate(-105deg) saturate(1.4) brightness(0.7)',
          }}>
            <Suspense fallback={<div style={{ width: '100%', height: '100%', background: '#0B0F14' }} />}>
              <Spline
                scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
                style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
              />
            </Suspense>
          </div>

          {/* green glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 55% at 65% 45%, rgba(0,229,153,0.07) 0%, transparent 70%)',
          }} />

          {/* vignette */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `
              linear-gradient(to right,  rgba(11,15,20,0.85) 0%, transparent 38%, transparent 62%, rgba(11,15,20,0.78) 100%),
              linear-gradient(to bottom, rgba(11,15,20,0.4)  0%, transparent 35%, transparent 55%, rgba(11,15,20,0.97) 100%)
            `,
          }} />

          {/* top fade behind nav */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 80, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(11,15,20,0.6), transparent)',
          }} />
        </div>

        {/* ── Hero content ── */}
        <div
          ref={contentRef}
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', alignItems: 'center',
            minHeight: '100svh',
            padding: '0 32px',
            maxWidth: 1200, margin: '0 auto',
            pointerEvents: 'none',
          }}
        >
          <div style={{ maxWidth: 580, paddingTop: 60, paddingBottom: 120, pointerEvents: 'auto' }}>

            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              <span className="lp-eyebrow" style={{ display: 'inline-flex', marginBottom: 28 }}>
                <span className="pip" />
                LLM observability, coming soon
              </span>
            </motion.div>

            <motion.h1
              className="lp-h1 lp-h1--waitlist"
              style={{ margin: '0 0 24px', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25, ease }}
            >
              You&apos;re spending real money on LLMs.{' '}
              <span className="lp-accent">You have no idea which features</span>{' '}
              are burning most of it.
            </motion.h1>

            <motion.p
              className="lp-sub lp-sub--hero"
              style={{ marginBottom: 36, textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              Gantry wraps your existing AI client in one line. See cost, tokens, and latency per
              feature — and which model switch saves the most, without touching your architecture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease }}
            >
              <WaitlistForm />
            </motion.div>
          </div>
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--text-3)', fontFamily: 'var(--font-mono, monospace)',
          }}>See it live</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════ Product preview — rises over the hero on scroll ════════ */}
      <section
        style={{
          position: 'relative', zIndex: 20,
          background: 'var(--bg-0)',
          marginTop: '-12vh',
          paddingBottom: 96,
          overflowX: 'clip', /* clip (not hidden) so overflow-y stays visible — hidden would turn this into a scroll container and clip the parallax */
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div ref={screenshotRef} style={{ willChange: 'transform' }}>
            <HeroProductPreview />
          </div>

          {/* caption under the dashboard */}
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <p style={{
              fontSize: 13, color: 'var(--text-3)',
              fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.04em', margin: 0,
            }}>
              Your real spend, traced per feature — the moment you wrap your client.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
