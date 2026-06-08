/* ============================================================
   Direction A — "Blueprint / Instrument"
   Lever: STRUCTURE. Hairlines, corner brackets, rulers,
   mono coordinate labels, the logo diagonal as motif.
   Brand mint kept as data-ink only. Sharp corners.
   ============================================================ */
function VariantA() {
  const Mark = ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M14 5 V43 M14 30 L34 13" stroke="#fff" strokeWidth="3.4" strokeLinecap="square"/><path d="M34 13 V43" stroke="#00E599" strokeWidth="3.4" strokeLinecap="square"/></svg>
  );
  // corner-bracket frame
  const Frame = ({ children, style, pad = 16 }) => (
    <div className="vA-frame" style={{ padding: pad, ...style }}>
      <span className="vA-c tl" /><span className="vA-c tr" /><span className="vA-c bl" /><span className="vA-c br" />
      {children}
    </div>
  );
  const nav = [['01', 'OVERVIEW', true], ['02', 'USAGE'], ['03', 'ALERTS'], ['04', 'BUDGETS'], ['05', 'ADVISOR'], ['06', 'SETTINGS']];
  const bars = [['GPT-4o', 100, '$14.6K', 'rgba(255,255,255,0.45)', 'CURRENT'], ['Mistral L2', 27, '$3.9K', '#00E599', 'RECOMMEND'], ['GPT-4o mini', 14, '$2.1K', 'rgba(255,255,255,0.2)', '']];
  return (
    <div className="vA">
      <style>{`
        .vA { width:1280px; height:880px; background:#0B0F14; color:#fff; font-family:'Inter',sans-serif; display:flex; position:relative; overflow:hidden; }
        .vA *{ box-sizing:border-box; }
        .vA-mono{ font-family:'JetBrains Mono',monospace; }
        /* sidebar */
        .vA-side{ width:208px; flex:none; border-right:1px solid rgba(255,255,255,0.09); padding:22px 0; display:flex; flex-direction:column; }
        .vA-logo{ display:flex; align-items:center; gap:11px; padding:0 20px 22px; }
        .vA-wm{ font-weight:700; letter-spacing:0.26em; font-size:14px; }
        .vA-navlabel{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.22em; color:rgba(255,255,255,0.3); padding:0 20px 10px; }
        .vA-nav{ display:flex; flex-direction:column; }
        .vA-ni{ display:flex; align-items:center; gap:12px; padding:9px 20px; font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:0.08em; color:rgba(255,255,255,0.5); border-left:2px solid transparent; }
        .vA-ni .ix{ color:rgba(255,255,255,0.28); }
        .vA-ni.on{ color:#fff; border-left-color:#00E599; background:linear-gradient(90deg,rgba(0,229,153,0.06),transparent); }
        .vA-ni.on .ix{ color:#00E599; }
        /* main */
        .vA-main{ flex:1; min-width:0; display:flex; flex-direction:column; }
        .vA-ruler{ height:34px; border-bottom:1px solid rgba(255,255,255,0.09); display:flex; align-items:flex-end; padding:0 28px 4px; position:relative; }
        .vA-ticks{ position:absolute; left:28px; right:28px; bottom:0; height:10px; display:flex; justify-content:space-between; }
        .vA-ticks i{ width:1px; background:rgba(255,255,255,0.16); height:5px; }
        .vA-ticks i:nth-child(5n+1){ height:10px; background:rgba(255,255,255,0.28); }
        .vA-coord{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.14em; color:rgba(255,255,255,0.34); }
        .vA-head{ display:flex; align-items:baseline; justify-content:space-between; padding:22px 28px 18px; border-bottom:1px solid rgba(255,255,255,0.09); }
        .vA-h1{ font-family:'Space Grotesk',sans-serif; font-size:30px; font-weight:600; letter-spacing:0.02em; }
        .vA-frame{ position:relative; }
        .vA-c{ position:absolute; width:8px; height:8px; border-color:rgba(255,255,255,0.4); }
        .vA-c.tl{ top:0; left:0; border-top:1px solid; border-left:1px solid; }
        .vA-c.tr{ top:0; right:0; border-top:1px solid; border-right:1px solid; }
        .vA-c.bl{ bottom:0; left:0; border-bottom:1px solid; border-left:1px solid; }
        .vA-c.br{ bottom:0; right:0; border-bottom:1px solid; border-right:1px solid; }
        .vA-kpis{ display:grid; grid-template-columns:repeat(4,1fr); }
        .vA-kpi{ padding:20px 22px; border-right:1px solid rgba(255,255,255,0.09); }
        .vA-kpi:last-child{ border-right:0; }
        .vA-klab{ font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:0.16em; color:rgba(255,255,255,0.36); }
        .vA-kval{ font-family:'JetBrains Mono',monospace; font-size:30px; font-weight:500; margin-top:12px; letter-spacing:-0.01em; }
        .vA-kfoot{ font-family:'JetBrains Mono',monospace; font-size:11px; margin-top:8px; }
        .vA-body{ padding:24px 28px; flex:1; display:grid; grid-template-columns:1fr; gap:1px; }
      `}</style>

      <div className="vA-side">
        <div className="vA-logo"><Mark s={22} /><span className="vA-wm">GANTRY</span></div>
        <div className="vA-navlabel">// MONITOR</div>
        <div className="vA-nav">
          {nav.map(([ix, l, on]) => <div key={ix} className={'vA-ni' + (on ? ' on' : '')}><span className="ix">{ix}</span>{l}</div>)}
        </div>
        <div style={{ marginTop: 'auto', padding: '0 20px' }}>
          <Frame pad={12} style={{ marginTop: 20 }}>
            <div className="vA-klab">SCALE · PLAN</div>
            <div className="vA-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 8 }}>86% USED</div>
          </Frame>
        </div>
      </div>

      <div className="vA-main">
        <div className="vA-ruler">
          <div className="vA-ticks">{Array.from({ length: 41 }).map((_, i) => <i key={i} />)}</div>
        </div>
        <div className="vA-head">
          <div className="vA-h1">Overview</div>
          <div className="vA-coord">§ PAYMENTS-API · PROD · US-EAST-1 · 30D</div>
        </div>

        <div className="vA-kpis">
          {[['TOTAL COST', '$128,430', '▼ 12.4%', '#00E599'], ['TOKENS', '1.94B', '▲ 8.1%', 'rgba(255,255,255,0.55)'], ['REQUESTS', '4.21M', '▲ 5.4%', 'rgba(255,255,255,0.55)'], ['P95 LATENCY', '842ms', 'WITHIN SLA', '#00E599']].map(([l, v, d, c]) => (
            <div className="vA-kpi" key={l}>
              <div className="vA-klab">{l}</div>
              <div className="vA-kval">{v}</div>
              <div className="vA-kfoot" style={{ color: c }}>{d}</div>
            </div>
          ))}
        </div>

        <div className="vA-body">
          <Frame pad={0} style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }}>
            <div style={{ display: 'flex' }}>
              {/* left: advisor meta */}
              <div style={{ width: 360, padding: '22px 24px', borderRight: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="vA-coord" style={{ color: '#00E599' }}>// MODEL ADVISOR</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 600, marginTop: 10 }}>classification</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20, fontSize: 12 }} className="vA-mono">
                  {[['NOW SERVING', 'GPT-4o'], ['VOLUME', '88M tok/mo'], ['CALLS', '6.1M']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: 6 }}>
                      <span style={{ color: 'rgba(255,255,255,0.36)' }}>{k}</span><span>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24 }}>
                  <div className="vA-coord" style={{ color: '#00E599' }}>EST. MONTHLY SAVINGS</div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 46, fontWeight: 600, color: '#00E599', letterSpacing: '-0.03em', marginTop: 6 }}>$10,700</div>
                  <div className="vA-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>−73% · 88.1% eval vs 89.0%</div>
                </div>
                <div style={{ marginTop: 22, border: '1px solid #00E599', color: '#00E599', textAlign: 'center', padding: '11px 0', fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '0.06em' }}>ROUTE → MISTRAL LARGE 2</div>
              </div>
              {/* right: bars */}
              <div style={{ flex: 1, padding: '22px 28px' }}>
                <div className="vA-coord" style={{ marginBottom: 18 }}>MONTHLY COST · 3 CANDIDATES</div>
                {bars.map(([nm, w, ct, c, tag]) => (
                  <div key={nm} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 70px', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14 }}>{nm}</div>
                      {tag && <div className="vA-mono" style={{ fontSize: 9, letterSpacing: '0.1em', color: c === '#00E599' ? '#00E599' : 'rgba(255,255,255,0.3)', marginTop: 3 }}>{tag}</div>}
                    </div>
                    <div style={{ position: 'relative', height: 10, background: 'rgba(255,255,255,0.05)' }}>
                      <div style={{ position: 'absolute', inset: 0, width: w + '%', background: c }} />
                    </div>
                    <div className="vA-mono" style={{ fontSize: 13, textAlign: 'right', color: c === '#00E599' ? '#00E599' : '#fff' }}>{ct}</div>
                  </div>
                ))}
                <div className="vA-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 18, lineHeight: 1.6 }}>// REPLAY OF LAST 30D TRAFFIC × PUBLISHED PRICING × GANTRY EVAL SUITE.<br />// ROUTING AFFECTS NEW REQUESTS ONLY.</div>
              </div>
            </div>
          </Frame>
        </div>
      </div>
    </div>
  );
}
window.VariantA = VariantA;
