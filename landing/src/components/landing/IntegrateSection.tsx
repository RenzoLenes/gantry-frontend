import ScrollReveal from '@/components/ui/ScrollReveal';
import IntegrateCodeEditor from '@/components/ui/IntegrateCodeEditor';

const steps = [
  {
    n: '01',
    title: 'Install the SDK',
    desc: 'npm install @gantry/sdk — or pip for Python. One dependency, no config files.',
  },
  {
    n: '02',
    title: 'Wrap your client',
    desc: 'One line. Your existing OpenAI / Anthropic / Gemini client keeps working exactly as before.',
  },
  {
    n: '03',
    title: 'Tag your features',
    desc: 'Pass a feature key in your call options to attribute cost, tokens, and latency per surface.',
  },
  {
    n: '04',
    title: 'Watch it flow',
    desc: 'First event lands in your dashboard in seconds. No deploys, no infra changes.',
  },
];

export default function IntegrateSection() {
  return (
    <section className="lp-sec" id="integrate">
      <div className="lp-wrap">
        <ScrollReveal>
          <p className="lp-section-label">How it works</p>
          <h2 className="lp-h2">
            From zero to first event{' '}
            <span className="lp-accent">in 60 seconds.</span>
          </h2>
          <p className="lp-lead">
            No migration, no rewrite. Gantry sits between your code and the model — passively,
            in one wrap.
          </p>
        </ScrollReveal>

        {/* two-column split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 56,
          alignItems: 'start',
          marginTop: 52,
        }}>

          {/* Left — steps */}
          <ScrollReveal>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
              {steps.map((s, i) => (
                <li key={s.n} style={{ display: 'flex', gap: 18, position: 'relative' }}>
                  {/* connector line */}
                  {i < steps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: 15, top: 36,
                      width: 1,
                      bottom: 0,
                      background: 'var(--hair)',
                    }} />
                  )}

                  {/* number badge */}
                  <div style={{
                    flexShrink: 0,
                    width: 32, height: 32,
                    borderRadius: '50%',
                    background: 'var(--accent-soft)',
                    border: '1px solid var(--accent-line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1,
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 10, fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: 'var(--accent)',
                    }}>{s.n}</span>
                  </div>

                  {/* content */}
                  <div style={{ paddingBottom: i < steps.length - 1 ? 32 : 0 }}>
                    <h4 style={{
                      margin: '4px 0 6px',
                      fontSize: 15, fontWeight: 600,
                      color: 'var(--text-0)', lineHeight: 1.3,
                    }}>{s.title}</h4>
                    <p style={{
                      margin: 0,
                      fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6,
                    }}>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* stat strip */}
            <div style={{
              marginTop: 40,
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--r-3)',
              overflow: 'hidden',
            }}>
              {[
                { val: '< 1ms', label: 'overhead' },
                { val: '0',     label: 'config files' },
                { val: '3',     label: 'providers' },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  padding: '18px 20px',
                  background: 'var(--bg-1)',
                  borderRight: i < 2 ? '1px solid var(--border-strong)' : 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 22, fontWeight: 700, color: 'var(--accent)',
                    lineHeight: 1, marginBottom: 6,
                  }}>{stat.val}</div>
                  <div style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 10, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--text-3)',
                  }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — code editor */}
          <ScrollReveal>
            <IntegrateCodeEditor />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
