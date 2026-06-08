/* ============================================================
   GANTRY Dashboard — secondary pages
   ============================================================ */

function UsagePage({ range }) {
  const r = RANGES[range];
  return (
    <div className="page">
      <div className="kpi-grid">
        <KpiCard label="Input tokens" value={fmtCompact(1.21e9 * r.mult)} delta={6.2} deltaGood="neutral" spark={series(7, 16, 100, 20)} />
        <KpiCard label="Output tokens" value={fmtCompact(0.73e9 * r.mult)} delta={11.0} deltaGood="neutral" spark={series(8, 16, 100, 26)} />
        <KpiCard label="Cache hit rate" value="38" unit="%" badge={<span className="badge badge-ok" style={{ height: 20 }}><span className="dot" />+4pts</span>} />
        <KpiCard label="Avg cost / 1K req" value={fmtUSD(30.5, 2)} delta={9.1} deltaGood spark={series(9, 16, 100, 14)} sparkColor="rgba(0,229,153,0.5)" />
      </div>
      <div className="content-grid">
        <CostChartCard range={range} />
        <FeatureSpend />
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="table">
          <thead><tr><th>Feature tag</th><th style={{ textAlign: 'right' }}>Calls</th><th style={{ textAlign: 'right' }}>In tok</th><th style={{ textAlign: 'right' }}>Out tok</th><th style={{ textAlign: 'right' }}>Cost</th><th style={{ textAlign: 'right' }}>p95</th></tr></thead>
          <tbody>
            {[['chat-support','3.4M','241M','169M',34250,'740ms'],['summarization','1.2M','98M','44M',24800,'910ms'],['extraction','920K','51M','13M',15720,'1.2s'],['classification','6.1M','71M','17M',14600,'310ms'],['search-rerank','2.8M','40M','6M',9800,'205ms']].map((row) => (
              <tr key={row[0]}><td className="t-name mono" style={{ fontSize: 13 }}>{row[0]}</td><td className="num">{row[1]}</td><td className="num">{row[2]}</td><td className="num">{row[3]}</td><td className="num">{fmtUSD(row[4], 2)}</td><td className="num">{row[5]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BudgetsPage() {
  const budgets = [
    { name: 'payments-api', used: 128430, cap: 150000, status: 'ok' },
    { name: 'support-copilot', used: 32800, cap: 40000, status: 'warn' },
    { name: 'docs-search', used: 9100, cap: 25000, status: 'ok' },
    { name: 'fraud-engine', used: 61200, cap: 60000, status: 'err' },
  ];
  return (
    <div className="page">
      <div className="content-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {budgets.map((b) => {
          const pct = Math.min(100, Math.round(b.used / b.cap * 100));
          const col = b.status === 'err' ? 'var(--error)' : b.status === 'warn' ? 'var(--warning)' : 'var(--accent)';
          return (
            <div key={b.name} className="card card-pad">
              <div className="row spread" style={{ marginBottom: 14 }}>
                <div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{b.name}</div>
                  <div className="stat-label" style={{ margin: '4px 0 0' }}>{fmtUSD(b.used)} of {fmtUSD(b.cap)}</div>
                </div>
                <span className="badge" style={{ height: 22, color: col, background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}><span className="dot" />{pct}%</span>
              </div>
              <div className="bar-track" style={{ height: 8 }}><div className="bar-fill" style={{ width: pct + '%', height: 8, background: col }} /></div>
              <div className="stat-foot" style={{ marginTop: 12 }}>{b.status === 'err' ? <span style={{ color: 'var(--error)' }}>Over budget by {fmtUSD(b.used - b.cap)}</span> : b.status === 'warn' ? <span style={{ color: 'var(--warning)' }}>{fmtUSD(b.cap - b.used)} remaining</span> : <span>{fmtUSD(b.cap - b.used)} remaining · projected {fmtUSD(b.used * 1.12)}</span>}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AlertsPage() {
  return (
    <div className="page">
      <div className="card" style={{ overflow: 'hidden' }}>
        {DATA.alerts.map((a, i) => {
          const map = { error: { c: 'var(--error)', bg: 'var(--error-soft)', I: Ico.warn }, warning: { c: 'var(--warning)', bg: 'var(--warning-soft)', I: Ico.warn }, ok: { c: 'var(--accent)', bg: 'var(--accent-soft)', I: Ico.check } };
          const s = map[a.sev];
          return (
            <div key={a.id} className="alert-row" style={{ borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <div className="alert-ic" style={{ background: s.bg, color: s.c }}><s.I width={17} height={17} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="row gap-2"><span style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</span><span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>· {a.tag}</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 2 }}>{a.body}</div>
              </div>
              <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{a.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="page">
      <div className="card card-pad" style={{ maxWidth: 640 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Project</h3>
        <p style={{ fontSize: 13, color: 'var(--text-2)', margin: '0 0 20px' }}>Connection details for <span className="mono">payments-api</span>.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><label className="field-label">DSN key</label><input className="input mono" value="gy_live_8f2c4a91b6d3e057fa12c89b" readOnly /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><label className="field-label">Region</label><select className="select"><option>us-east-1</option><option>eu-west-1</option></select></div>
            <div><label className="field-label">Environment</label><select className="select"><option>production</option><option>staging</option></select></div>
          </div>
          <div><label className="field-label">Monthly budget</label><input className="input mono" value="$150,000.00" /></div>
        </div>
        <hr className="divider" style={{ margin: '20px 0' }} />
        <div className="row spread">
          <div><div style={{ fontWeight: 600, fontSize: 14 }}>Auto-routing</div><div style={{ fontSize: 13, color: 'var(--text-2)' }}>Apply Model Advisor recommendations automatically</div></div>
          <div className="switch on"><span className="knob" /></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { UsagePage, BudgetsPage, AlertsPage, SettingsPage });
