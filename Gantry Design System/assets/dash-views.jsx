/* ============================================================
   GANTRY Dashboard — Overview view + Model Advisor hero
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---- KPI stat card ---- */
function KpiCard({ label, value, unit, delta, deltaGood, spark, sparkColor, badge }) {
  const col = deltaGood === true ? 'var(--accent)' : deltaGood === 'neutral' ? 'var(--text-2)' : 'var(--error)';
  const arrow = deltaGood === true ? '▼' : deltaGood === 'neutral' ? '▲' : '▲';
  return (
    <div className="stat-card gy-frame">
      <Brackets />
      <p className="stat-label">{label}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
        <p className="stat-value mono">{value}{unit && <span style={{ fontSize: 18, color: 'var(--text-2)', marginLeft: 2 }}>{unit}</span>}</p>
        {spark && <Spark data={spark} stroke={sparkColor || 'rgba(255,255,255,0.32)'} />}
      </div>
      <div className="stat-foot">
        {delta != null && (
          <span className="delta" style={{ color: col }}>
            {arrow} {Math.abs(delta)}%
          </span>
        )}
        {badge}
        {delta != null && <span style={{ color: 'var(--text-3)' }}>vs. prior period</span>}
      </div>
    </div>
  );
}

/* ---- Chart card (cost over time) ---- */
function CostChartCard({ range }) {
  const r = RANGES[range];
  const data = series(3.2, r.points, 2800 * r.mult, 900 * r.mult);
  const total = DATA.kpis['30d'].cost * r.mult;
  const [metric, setMetric] = useState('Cost');
  return (
    <div className="card card-pad" style={{ gridColumn: 'span 2' }}>
      <div className="row spread" style={{ marginBottom: 20, alignItems: 'flex-start' }}>
        <div>
          <div className="stat-label" style={{ margin: 0 }}>Total {metric.toLowerCase()} · {r.label.toLowerCase()}</div>
          <div className="row gap-3" style={{ marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em' }}>
              {metric === 'Cost' ? fmtUSD(total, 2) : metric === 'Tokens' ? fmtCompact(DATA.kpis['30d'].tokens * r.mult) : '842ms'}
            </span>
            <span className="delta delta-up">▼ 12.4%</span>
          </div>
        </div>
        <div className="tabs">
          {['Cost', 'Tokens', 'Latency'].map((m) => (
            <button key={m} className={'tab' + (metric === m ? ' active' : '')} onClick={() => setMetric(m)}>{m}</button>
          ))}
        </div>
      </div>
      <AreaLine data={data} id={'cost-' + range + metric} stroke={metric === 'Latency' ? '#5B9DFF' : '#00E599'} />
      <div className="row spread mono" style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 12 }}>
        {r.xs.map((x) => <span key={x}>{x}</span>)}
      </div>
    </div>
  );
}

/* ============================================================
   MODEL ADVISOR — hero feature
   ============================================================ */
function ModelAdvisor({ onApply, applied }) {
  const [activeId, setActiveId] = useState('classification');
  const feature = DATA.features.find((f) => f.id === activeId);
  const cur = feature.options.find((o) => o.current);
  const rec = feature.options.find((o) => o.recommended);
  const savings = cur.cost - rec.cost;
  const annual = savings * 12;
  const pct = Math.round((savings / cur.cost) * 100);
  const maxCost = Math.max(...feature.options.map((o) => o.cost));
  const isApplied = applied.includes(activeId);

  return (
    <div className="advisor gy-frame">
      <Brackets color="var(--accent-line)" />
      <div className="advisor-glow" />
      {/* header */}
      <div className="advisor-head">
        <div className="row gap-3">
          <div className="advisor-ic"><Ico.bolt width={18} height={18} /></div>
          <div>
            <div className="row gap-2" style={{ alignItems: 'center' }}>
              <h3 className="advisor-title">Model Advisor</h3>
              <span className="badge badge-ok" style={{ height: 20 }}><span className="dot" />Live</span>
            </div>
            <div className="advisor-sub">Cheaper models that hold quality on your traffic</div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>updated 4m ago</div>
      </div>

      {/* feature tag chips */}
      <div className="advisor-chips">
        {DATA.features.map((f) => {
          const s = f.options.find((o) => o.current).cost - f.options.find((o) => o.recommended).cost;
          return (
            <button key={f.id} className={'fchip' + (f.id === activeId ? ' active' : '')} onClick={() => setActiveId(f.id)}>
              <span className="mono">{f.tag}</span>
              <span className="fchip-save">−{fmtUSD(s)}</span>
            </button>
          );
        })}
      </div>

      <div className="advisor-body">
        {/* left: current context + savings */}
        <div className="advisor-left">
          <div className="advisor-meta">
            <div className="am-row"><span className="am-k">Feature tag</span><span className="am-v mono">{feature.tag}</span></div>
            <div className="am-row"><span className="am-k">Now serving</span><span className="am-v">{feature.current}</span></div>
            <div className="am-row"><span className="am-k">Volume</span><span className="am-v mono">{feature.volume}</span></div>
            <div className="am-row"><span className="am-k">Calls</span><span className="am-v mono">{feature.calls}</span></div>
          </div>

          <div className="savings-block">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>Estimated monthly savings</div>
            <div className="savings-num">{fmtUSD(savings)}</div>
            <div className="savings-foot">
              <span className="mono" style={{ color: 'var(--accent)' }}>−{pct}%</span>
              <span style={{ color: 'var(--text-2)' }}>· {fmtUSD(annual)}/yr · {rec.eval}% eval vs {cur.eval}%</span>
            </div>
          </div>

          <button className={'btn btn-block ' + (isApplied ? 'btn-secondary' : 'btn-primary')} onClick={() => !isApplied && onApply(feature, rec, savings)} disabled={isApplied}>
            {isApplied ? <><Ico.check width={16} height={16} /> Routing to {rec.model}</> : <>Route {feature.tag} → {rec.model}</>}
          </button>
        </div>

        {/* right: comparison bars */}
        <div className="advisor-right">
          <div className="eyebrow" style={{ marginBottom: 14 }}>Monthly cost · 3 candidates</div>
          {feature.options.map((o) => {
            const v = vendorOf(o.model);
            const isRec = o.recommended;
            const isCur = o.current;
            return (
              <div key={o.model} className={'bar-row' + (isRec ? ' rec' : '')}>
                <div className="bar-label">
                  <span className="vchip" style={{ background: VENDOR[v].c }} />
                  <span className="bar-model">{o.model}</span>
                  {isCur && <span className="tagpill">current</span>}
                  {isRec && <span className="tagpill rec">recommended</span>}
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{
                    width: (o.cost / maxCost * 100) + '%',
                    background: isRec ? 'var(--accent)' : isCur ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.22)',
                  }} />
                </div>
                <div className="bar-cost mono" style={{ color: isRec ? 'var(--accent)' : 'var(--text-1)' }}>{fmtUSD(o.cost)}</div>
                <div className="bar-eval mono">{o.eval}%</div>
              </div>
            );
          })}
          <p className="advisor-disclaimer">
            Estimates replay your last 30 days of traffic against published vendor pricing and Gantry’s eval suite. Quality (eval) measured on a sampled set of your prompts. Routing affects new requests only; in-flight calls are unchanged.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---- Model spend table ---- */
function ModelTable() {
  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="card-pad" style={{ paddingBottom: 0 }}>
        <div className="row spread" style={{ marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Cost by model</h3>
          <div className="tabs-line" style={{ borderBottom: 'none' }}>
            <button className="tab-line active" style={{ padding: '4px 0' }}>Spend</button>
          </div>
        </div>
      </div>
      <table className="table">
        <thead><tr><th>Model</th><th style={{ textAlign: 'right' }}>Spend</th><th style={{ textAlign: 'right' }}>Tokens</th><th style={{ textAlign: 'right' }}>Share</th><th style={{ textAlign: 'right' }}>p95</th><th style={{ width: 90 }}>Status</th></tr></thead>
        <tbody>
          {DATA.models.map((m) => (
            <tr key={m.name}>
              <td className="t-name"><span className="row gap-2"><span className="vchip" style={{ background: VENDOR[m.vendor].c }} />{m.name}</span></td>
              <td className="num">{fmtUSD(m.spend, 2)}</td>
              <td className="num">{fmtCompact(m.tokens)}</td>
              <td className="num">{m.share}%</td>
              <td className="num">{m.p95}</td>
              <td>{m.status === 'ok'
                ? <span className="badge badge-ok" style={{ height: 20 }}><span className="dot" />OK</span>
                : <span className="badge badge-warning" style={{ height: 20 }}><span className="dot" />Slow</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---- Spend by feature (horizontal) ---- */
function FeatureSpend() {
  const max = Math.max(...DATA.features_top.map((f) => f.cost));
  return (
    <div className="card card-pad">
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 18px' }}>Spend by feature</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {DATA.features_top.map((f) => (
          <div key={f.tag} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 64px', alignItems: 'center', gap: 12 }}>
            <span className="mono" style={{ fontSize: 13, color: 'var(--text-1)' }}>{f.tag}</span>
            <div className="bar-track"><div className="bar-fill" style={{ width: (f.cost / max * 100) + '%', background: 'rgba(255,255,255,0.28)' }} /></div>
            <span className="mono" style={{ fontSize: 13, textAlign: 'right', color: 'var(--text-0)' }}>{fmtUSD(f.cost)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   OVERVIEW PAGE
   ============================================================ */
function OverviewPage({ range, onApply, applied }) {
  const k = DATA.kpis['30d'];
  const m = RANGES[range].mult;
  return (
    <div className="page">
      <div className="kpi-grid">
        <KpiCard label="Total cost" value={fmtUSD(k.cost * m)} delta={12.4} deltaGood spark={series(1, 16, 100, 30)} sparkColor="rgba(0,229,153,0.5)" />
        <KpiCard label="Tokens processed" value={fmtCompact(k.tokens * m)} delta={8.1} deltaGood="neutral" spark={series(2, 16, 100, 24)} />
        <KpiCard label="Requests" value={fmtCompact(k.reqs * m)} delta={5.4} deltaGood="neutral" spark={series(5, 16, 100, 18)} />
        <KpiCard label="p95 latency" value="842" unit="ms" badge={<span className="badge badge-ok" style={{ height: 20 }}><span className="dot" />within SLA</span>} />
      </div>

      <ModelAdvisor onApply={onApply} applied={applied} />

      <div className="content-grid">
        <CostChartCard range={range} />
        <FeatureSpend />
      </div>

      <ModelTable />
    </div>
  );
}

Object.assign(window, { KpiCard, CostChartCard, ModelAdvisor, ModelTable, FeatureSpend, OverviewPage });
