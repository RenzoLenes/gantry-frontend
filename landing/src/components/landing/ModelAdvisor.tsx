import ScrollReveal from '@/components/ui/ScrollReveal';

const bars = [
  { name: 'GPT-4o',          label: 'current',     width: '100%', color: 'rgba(255,255,255,0.45)', cost: '$14.6K', costColor: 'var(--text-0)' },
  { name: 'Mistral Large 2', label: 'recommended',  width: '27%',  color: 'var(--accent)',          cost: '$3.9K',  costColor: 'var(--accent)'  },
  { name: 'GPT-4o mini',     label: 'fallback',     width: '14%',  color: 'rgba(255,255,255,0.22)', cost: '$2.1K',  costColor: 'var(--text-0)' },
];

export default function ModelAdvisor() {
  return (
    <section className="lp-sec" id="advisor">
      <div className="lp-wrap">
        <div className="lp-marker">
          <span className="ix">// 03</span>
          <span className="lab">Model Advisor</span>
          <span className="line" />
        </div>

        <ScrollReveal className="lp-advisor gy-frame">
          <span className="gy-c tl" style={{ borderColor: 'var(--accent-line)' }} />
          <span className="gy-c tr" style={{ borderColor: 'var(--accent-line)' }} />
          <span className="gy-c bl" style={{ borderColor: 'var(--accent-line)' }} />
          <span className="gy-c br" style={{ borderColor: 'var(--accent-line)' }} />

          <div>
            <div className="coord coord-accent">// EST. MONTHLY SAVINGS · classification</div>
            <div className="lp-adv-save">$10,700</div>
            <div
              className="mono"
              style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '18px' }}
            >
              <span style={{ color: 'var(--accent)' }}>−73%</span> · $128,400/yr · 88.1% eval vs 89.0%
            </div>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--text-1)',
                lineHeight: 1.55,
                maxWidth: '340px',
                margin: '0 0 22px',
              }}
            >
              Gantry replays your last 30 days of traffic against every viable model and surfaces
              the cheapest one that holds quality. Route in one click. New requests only.
            </p>
            <a className="btn btn-primary" href="#" rel="noopener noreferrer">
              Route classification to Mistral Large 2
            </a>
          </div>

          <div>
            <div className="coord" style={{ marginBottom: '18px' }}>
              Monthly cost · 3 candidates
            </div>
            {bars.map((b, i) => (
              <div key={i} className="lp-bar">
                <div className="nm">
                  {b.name}
                  <small className={b.label === 'recommended' ? 'rec' : ''}>{b.label}</small>
                </div>
                <div className="track">
                  <i style={{ width: b.width, background: b.color }} />
                </div>
                <div className="ct" style={{ color: b.costColor }}>
                  {b.cost}
                </div>
              </div>
            ))}
            <div
              className="mono"
              style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '18px', lineHeight: 1.6 }}
            >
              // REPLAY OF LAST 30D TRAFFIC × PUBLISHED PRICING × GANTRY EVAL SUITE.<br />
              // ROUTING AFFECTS NEW REQUESTS ONLY.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
