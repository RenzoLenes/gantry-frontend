import ScrollReveal from '@/components/ui/ScrollReveal';

export default function ProductSection() {
  return (
    <section className="lp-product" id="product">
      <ScrollReveal className="lp-browser">
        <div className="lp-browser-bar">
          <div className="lp-dots">
            <i /><i /><i />
          </div>
          <div className="lp-url">
            <svg className="lock" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            app.gantry.dev/payments-api/overview
          </div>
        </div>
        <DashboardMock />
      </ScrollReveal>
    </section>
  );
}

function DashboardMock() {
  const rows = [
    { feature: 'summarization', model: 'gpt-4o',            calls: '14,820', tokens: '18.4M', cost: '$4,230', p95: '1,024ms', delta: '+2%'  },
    { feature: 'classification', model: 'gpt-4o',           calls: '38,102', tokens: '11.2M', cost: '$2,580', p95: '610ms',   delta: '+0%'  },
    { feature: 'chat-support',   model: 'claude-3-5-sonnet', calls: '9,441',  tokens: '22.1M', cost: '$3,320', p95: '1,411ms', delta: '+8%'  },
    { feature: 'extraction',     model: 'gemini-1.5-pro',    calls: '6,018',  tokens: '8.9M',  cost: '$890',   p95: '832ms',   delta: '-4%'  },
    { feature: 'embeddings',     model: 'text-embed-3-large',calls: '204,550',tokens: '41.2M', cost: '$206',   p95: '88ms',    delta: '+1%'  },
  ];

  return (
    <div style={{
      background: 'var(--bg-0)',
      padding: '24px',
      fontFamily: 'var(--font-mono, monospace)',
    }}>
      {/* stat cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Total cost / month', value: '$10,940', delta: '+12%', accent: false },
          { label: 'Tokens / month',     value: '101.8M',  delta: '+9%',  accent: false },
          { label: 'Requests / month',   value: '272,931', delta: '+11%', accent: false },
          { label: 'Advisor savings',    value: '$10,700', delta: '−73%', accent: true  },
        ].map((s) => (
          <div key={s.label} style={{
            background: 'var(--bg-1)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-3)', padding: '16px',
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', color: s.accent ? 'var(--accent)' : 'var(--text-0)' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: s.accent ? 'var(--accent)' : 'var(--text-3)', marginTop: '6px' }}>{s.delta} vs last mo</div>
          </div>
        ))}
      </div>

      {/* table */}
      <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: 'var(--r-3)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }} aria-label="LLM feature costs by model">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Feature', 'Model', 'Calls', 'Tokens', 'Cost', 'p95', '30d Δ'].map((h) => (
                <th key={h} scope="col" style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-0)', fontWeight: 500 }}>{r.feature}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-2)' }}>{r.model}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-0)', fontVariantNumeric: 'tabular-nums' }}>{r.calls}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-1)', fontVariantNumeric: 'tabular-nums' }}>{r.tokens}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-0)', fontVariantNumeric: 'tabular-nums' }}>{r.cost}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-2)', fontVariantNumeric: 'tabular-nums' }}>{r.p95}</td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: r.delta.startsWith('-') ? 'var(--accent)' : 'var(--error)', fontVariantNumeric: 'tabular-nums' }}>{r.delta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a className="btn btn-primary btn-sm" href="#">Open the live dashboard →</a>
      </div>
    </div>
  );
}
