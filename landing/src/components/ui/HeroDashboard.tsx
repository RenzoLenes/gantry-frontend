'use client';

import { useEffect, useRef, useState } from 'react';

const FEATURES = [
  { name: '/chat',       model: 'gpt-4o',        cost: 847, share: 46, trend: +12 },
  { name: '/code',       model: 'gpt-4o',        cost: 621, share: 34, trend: +8  },
  { name: '/summarize',  model: 'gpt-4o',        cost: 312, share: 17, trend: +31, hot: true },
  { name: '/embed',      model: 'text-3-small',  cost:  48, share:  3, trend: -2  },
];

const TOTAL = 1828;

function Trend({ pct }: { pct: number }) {
  const up = pct > 0;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 2,
      fontSize: 10, fontFamily: 'var(--font-mono, monospace)', fontWeight: 600,
      color: up ? '#F5B544' : 'var(--accent)',
    }}>
      {up ? '↑' : '↓'} {Math.abs(pct)}%
    </span>
  );
}

export default function HeroDashboard() {
  const [show, setShow] = useState(false);
  const [barWidths, setBarWidths] = useState<number[]>(FEATURES.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const timers = FEATURES.map((f, i) =>
      setTimeout(() => {
        setBarWidths(prev => {
          const next = [...prev];
          next[i] = f.share;
          return next;
        });
      }, 200 + i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, [show]);

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border-strong)',
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: '0 24px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,153,0.07)',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      {/* ── Window chrome ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 14px',
        background: 'var(--bg-inset)',
        borderBottom: '1px solid var(--hair)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, display: 'flex', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: 11, color: 'var(--text-3)',
            background: 'var(--bg-2)', borderRadius: 4,
            padding: '2px 12px', border: '1px solid var(--hair)',
          }}>
            app.gantry.dev/analytics
          </span>
        </div>
      </div>

      {/* ── App nav bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px',
        background: 'var(--bg-1)',
        borderBottom: '1px solid var(--hair)',
      }}>
        <div style={{ display: 'flex' }}>
          {['Overview', 'Cost', 'Traces', 'Alerts'].map((tab, i) => (
            <div key={tab} style={{
              padding: '10px 14px',
              fontSize: 12, fontWeight: i === 1 ? 600 : 400,
              color: i === 1 ? 'var(--text-0)' : 'var(--text-3)',
              borderBottom: i === 1 ? '2px solid var(--accent)' : '2px solid transparent',
              cursor: 'default',
            }}>{tab}</div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: 'var(--text-3)',
            border: '1px solid var(--hair)', borderRadius: 4,
            padding: '4px 8px', background: 'var(--bg-inset)',
          }}>
            <span>Jun 2026</span>
            <span style={{ color: 'var(--text-4)' }}>▾</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 11, color: 'var(--accent)',
            background: 'var(--accent-soft)', border: '1px solid var(--accent-line)',
            borderRadius: 4, padding: '4px 8px',
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 5px rgba(0,229,153,0.7)',
              animation: 'gy-pip-pulse 2.4s ease-in-out infinite',
            }} />
            Live
          </div>
        </div>
      </div>

      {/* ── Total cost KPI ── */}
      <div style={{
        padding: '16px 20px 14px',
        borderBottom: '1px solid var(--hair)',
        background: 'var(--bg-inset)',
      }}>
        <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono,monospace)' }}>
          Total LLM Spend · Jun 2026
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 28, fontWeight: 700, color: 'var(--text-0)', lineHeight: 1,
            opacity: show ? 1 : 0,
            transition: 'opacity 0.4s 0.2s',
          }}>
            ${TOTAL.toLocaleString()}
          </span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 11, color: '#F5B544',
            background: 'rgba(245,181,68,0.1)', border: '1px solid rgba(245,181,68,0.25)',
            borderRadius: 4, padding: '2px 7px',
            fontFamily: 'var(--font-mono,monospace)',
            opacity: show ? 1 : 0, transition: 'opacity 0.4s 0.4s',
          }}>
            ↑ 14% vs May
          </span>
        </div>
      </div>

      {/* ── Feature table ── */}
      <div>
        {/* col headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 96px 72px 60px',
          padding: '8px 20px',
          borderBottom: '1px solid var(--hair)',
          background: 'var(--bg-inset)',
        }}>
          {['Feature', 'Model', 'Cost/mo', 'Share'].map(h => (
            <span key={h} style={{
              fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--text-3)', fontFamily: 'var(--font-mono,monospace)',
            }}>{h}</span>
          ))}
        </div>

        {FEATURES.map((f, i) => (
          <div
            key={f.name}
            style={{
              borderBottom: '1px solid var(--hair)',
              background: f.hot ? 'rgba(245,181,68,0.03)' : 'transparent',
              opacity: show ? 1 : 0,
              transform: show ? 'none' : 'translateY(4px)',
              transition: `opacity 0.4s ${0.15 + i * 0.07}s, transform 0.4s ${0.15 + i * 0.07}s`,
            }}
          >
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 96px 72px 60px',
              padding: '11px 20px 6px',
              alignItems: 'center',
            }}>
              {/* feature name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                {f.hot && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" fill="rgba(245,181,68,0.2)" stroke="rgba(245,181,68,0.5)" strokeWidth="1"/>
                    <circle cx="5" cy="5" r="2" fill="#F5B544"/>
                  </svg>
                )}
                {!f.hot && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-4)', flexShrink: 0 }} />
                )}
                <span style={{
                  fontFamily: 'var(--font-mono,monospace)', fontSize: 12,
                  color: f.hot ? 'var(--text-0)' : 'var(--text-1)',
                  fontWeight: f.hot ? 600 : 400,
                }}>{f.name}</span>
              </div>

              {/* model badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: 'var(--font-mono,monospace)', fontSize: 10,
                color: 'var(--text-3)', background: 'var(--bg-2)',
                border: '1px solid var(--hair)', borderRadius: 3,
                padding: '2px 6px', width: 'fit-content',
              }}>{f.model}</span>

              {/* cost */}
              <span style={{
                fontFamily: 'var(--font-mono,monospace)', fontSize: 13, fontWeight: 600,
                color: f.hot ? '#F5B544' : 'var(--text-1)',
              }}>${f.cost}</span>

              {/* trend */}
              <Trend pct={f.trend} />
            </div>

            {/* share bar */}
            <div style={{ padding: '0 20px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                flex: 1, height: 3, borderRadius: 999,
                background: 'var(--bg-3)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 999,
                  background: f.hot
                    ? 'linear-gradient(90deg,rgba(245,181,68,0.6),#F5B544)'
                    : 'linear-gradient(90deg,rgba(0,229,153,0.3),rgba(0,229,153,0.6))',
                  width: `${barWidths[i]}%`,
                  transition: `width 0.7s cubic-bezier(0.22,0.61,0.36,1) ${0.3 + i * 0.1}s`,
                }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-mono,monospace)', fontSize: 10,
                color: 'var(--text-3)', width: 28, textAlign: 'right', flexShrink: 0,
              }}>{f.share}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recommendation ── */}
      <div style={{
        margin: '12px 14px',
        background: 'var(--bg-inset)',
        border: '1px solid var(--accent-line)',
        borderRadius: 5,
        overflow: 'hidden',
        opacity: show ? 1 : 0,
        transform: show ? 'none' : 'translateY(4px)',
        transition: 'opacity 0.5s 0.6s, transform 0.5s 0.6s',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 12px',
          background: 'linear-gradient(90deg, rgba(0,229,153,0.06), transparent)',
          borderBottom: '1px solid var(--accent-line)',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
          <span style={{
            fontSize: 10, fontFamily: 'var(--font-mono,monospace)',
            letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)',
          }}>Optimization detected</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            <span style={{
              fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono,monospace)',
              background: 'var(--bg-2)', borderRadius: 3, padding: '1px 6px',
              border: '1px solid var(--hair)', cursor: 'default',
            }}>Dismiss</span>
            <span style={{
              fontSize: 10, color: 'var(--accent-ink)', fontFamily: 'var(--font-mono,monospace)',
              background: 'var(--accent)', borderRadius: 3, padding: '1px 6px',
              cursor: 'default', fontWeight: 600,
            }}>Apply</span>
          </div>
        </div>
        <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <p style={{ margin: '0 0 4px', fontSize: 12, color: 'var(--text-1)', lineHeight: 1.4 }}>
              Route <code style={{ fontFamily: 'var(--font-mono,monospace)', color: 'var(--text-0)', background: 'var(--bg-3)', padding: '1px 4px', borderRadius: 2 }}>/summarize</code> to{' '}
              <span style={{ color: 'var(--text-0)', fontWeight: 500 }}>claude-haiku-3-5</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <div style={{ flex: 1, height: 2, borderRadius: 999, background: 'var(--bg-3)', maxWidth: 120, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 999, width: '79%',
                  background: 'linear-gradient(90deg, var(--accent-700), var(--accent))',
                  transition: 'width 0.8s 0.7s',
                }} />
              </div>
              <span style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--font-mono,monospace)' }}>79% cheaper</span>
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono,monospace)', lineHeight: 1 }}>$248</div>
            <div style={{ fontSize: 9, color: 'var(--text-3)', fontFamily: 'var(--font-mono,monospace)', marginTop: 2 }}>saved/mo</div>
          </div>
        </div>
      </div>

    </div>
  );
}
