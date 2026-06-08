/* ============================================================
   Direction B — "Terminal / Ledger"
   Lever: TYPE + DENSITY. Oversized mono numerals as hero,
   tabular everything, rules not boxes. Bloomberg energy.
   ============================================================ */
function VariantB() {
  const Mark = ({ s = 20 }) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M14 5 V43 M14 30 L34 13" stroke="#fff" strokeWidth="3.6" strokeLinecap="square"/><path d="M34 13 V43" stroke="#00E599" strokeWidth="3.6" strokeLinecap="square"/></svg>
  );
  const nav = ['OVERVIEW', 'USAGE', 'ALERTS', 'BUDGETS', 'ADVISOR'];
  const ledger = [
    ['GPT-4o', 'openai', '68,430.24', '812M', '53%', '910', 'ok'],
    ['Claude 3.5 Sonnet', 'anthropic', '34,250.11', '604M', '27%', '740', 'ok'],
    ['Gemini 1.5 Pro', 'google', '15,720.10', '388M', '12%', '1.2K', 'warn'],
    ['Mistral Large 2', 'mistral', '10,028.79', '140M', '8%', '680', 'ok'],
  ];
  const adv = [['GPT-4o', '14,600', 100, 'rgba(255,255,255,0.4)', 'CUR'], ['Mistral Large 2', '3,900', 27, '#00E599', 'REC'], ['GPT-4o mini', '2,100', 14, 'rgba(255,255,255,0.18)', '']];
  return (
    <div className="vB">
      <style>{`
        .vB{ width:1280px; height:880px; background:#08090C; color:#E6E8EA; font-family:'JetBrains Mono',monospace; display:flex; overflow:hidden; }
        .vB *{ box-sizing:border-box; }
        .vB-side{ width:170px; flex:none; border-right:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; padding:18px 0; }
        .vB-logo{ display:flex; align-items:center; gap:9px; padding:0 16px 20px; }
        .vB-wm{ font-weight:700; letter-spacing:0.24em; font-size:13px; font-family:'JetBrains Mono',monospace; }
        .vB-ni{ padding:8px 16px; font-size:11px; letter-spacing:0.1em; color:rgba(255,255,255,0.4); display:flex; gap:8px; }
        .vB-ni:before{ content:'·'; color:rgba(255,255,255,0.25); }
        .vB-ni.on{ color:#00E599; }
        .vB-ni.on:before{ content:'▸'; color:#00E599; }
        .vB-main{ flex:1; min-width:0; display:flex; flex-direction:column; }
        .vB-top{ height:40px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; padding:0 22px; font-size:11px; color:rgba(255,255,255,0.45); letter-spacing:0.08em; }
        .vB-blink{ width:7px; height:13px; background:#00E599; display:inline-block; margin-left:2px; animation:vBbl 1.1s steps(1) infinite; }
        @keyframes vBbl{ 50%{ opacity:0; } }
        /* ticker KPI strip */
        .vB-strip{ display:grid; grid-template-columns:repeat(4,1fr); border-bottom:1px solid rgba(255,255,255,0.08); }
        .vB-cell{ padding:18px 22px; border-right:1px solid rgba(255,255,255,0.08); }
        .vB-cell:last-child{ border-right:0; }
        .vB-lab{ font-size:10px; letter-spacing:0.14em; color:rgba(255,255,255,0.36); }
        .vB-big{ font-size:38px; font-weight:600; letter-spacing:-0.02em; margin-top:10px; font-variant-numeric:tabular-nums; line-height:1; }
        .vB-d{ font-size:11px; margin-top:8px; }
        .vB-sec{ display:flex; flex:1; min-height:0; }
        .vB-ledger{ flex:1; border-right:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; }
        .vB-sech{ padding:12px 22px; font-size:10px; letter-spacing:0.16em; color:rgba(255,255,255,0.4); border-bottom:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; }
        table.vB-t{ width:100%; border-collapse:collapse; }
        .vB-t th{ text-align:right; font-size:9px; letter-spacing:0.12em; color:rgba(255,255,255,0.32); font-weight:400; padding:10px 22px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .vB-t th:first-child{ text-align:left; }
        .vB-t td{ text-align:right; font-size:13px; padding:13px 22px; border-bottom:1px solid rgba(255,255,255,0.05); font-variant-numeric:tabular-nums; }
        .vB-t td:first-child{ text-align:left; color:#fff; display:flex; align-items:center; gap:8px; }
        .vB-vd{ width:7px; height:7px; }
        .vB-adv{ width:440px; flex:none; display:flex; flex-direction:column; }
      `}</style>

      <div className="vB-side">
        <div className="vB-logo"><Mark s={18} /><span className="vB-wm">GANTRY</span></div>
        {nav.map((n, i) => <div key={n} className={'vB-ni' + (i === 0 ? ' on' : '')}>{n}</div>)}
        <div style={{ marginTop: 'auto', padding: '0 16px', fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>SCALE · 86%</div>
      </div>

      <div className="vB-main">
        <div className="vB-top"><span>PAYMENTS-API / PROD / US-EAST-1</span><span>LIVE<span className="vB-blink" /></span></div>

        <div className="vB-strip">
          {[['TOTAL COST', '$128,430', '▼ 12.4%', '#00E599'], ['TOKENS', '1.94B', '▲ 8.1%', 'rgba(255,255,255,0.5)'], ['REQUESTS', '4.21M', '▲ 5.4%', 'rgba(255,255,255,0.5)'], ['P95', '842ms', 'SLA OK', '#00E599']].map(([l, v, d, c]) => (
            <div className="vB-cell" key={l}><div className="vB-lab">{l}</div><div className="vB-big">{v}</div><div className="vB-d" style={{ color: c }}>{d}</div></div>
          ))}
        </div>

        <div className="vB-sec">
          <div className="vB-ledger">
            <div className="vB-sech"><span>COST BY MODEL</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>USD · 30D</span></div>
            <table className="vB-t">
              <thead><tr><th>MODEL</th><th>SPEND</th><th>TOKENS</th><th>SHARE</th><th>P95</th></tr></thead>
              <tbody>
                {ledger.map(([nm, vd, sp, tk, sh, p, st]) => (
                  <tr key={nm}>
                    <td><span className="vB-vd" style={{ background: st === 'warn' ? '#F5B544' : '#00E599' }} />{nm}</td>
                    <td>${sp}</td><td style={{ color: 'rgba(255,255,255,0.7)' }}>{tk}</td><td style={{ color: 'rgba(255,255,255,0.7)' }}>{sh}</td>
                    <td style={{ color: st === 'warn' ? '#F5B544' : 'rgba(255,255,255,0.7)' }}>{p}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="vB-sech" style={{ borderBottom: 0, borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: 'auto' }}><span>SPEND / FEATURE</span></div>
            <div style={{ padding: '6px 22px 18px' }}>
              {[['chat-support', '34,250', 100], ['summarization', '24,800', 72], ['extraction', '15,720', 46], ['classification', '14,600', 43]].map(([f, c, w]) => (
                <div key={f} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 60px', alignItems: 'center', gap: 12, padding: '7px 0' }}>
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.06)' }}><div style={{ height: 4, width: w + '%', background: 'rgba(255,255,255,0.32)' }} /></div>
                  <span style={{ fontSize: 11, textAlign: 'right' }}>${c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="vB-adv">
            <div className="vB-sech" style={{ color: '#00E599' }}><span>▸ MODEL ADVISOR</span><span>classification</span></div>
            <div style={{ padding: '22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="vB-lab">EST. MONTHLY SAVINGS</div>
              <div style={{ fontSize: 64, fontWeight: 700, color: '#00E599', letterSpacing: '-0.04em', lineHeight: 1, marginTop: 10 }}>$10,700</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 10 }}>−73% · $128,400/YR · 88.1% EVAL</div>

              <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {adv.map(([nm, ct, w, c, tag]) => (
                  <div key={nm} style={{ padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                      <span style={{ fontSize: 12, color: c === '#00E599' ? '#00E599' : '#fff' }}>{tag && <span style={{ color: 'rgba(255,255,255,0.3)', marginRight: 8 }}>{tag}</span>}{nm}</span>
                      <span style={{ fontSize: 12, color: c === '#00E599' ? '#00E599' : '#fff' }}>${ct}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)' }}><div style={{ height: 6, width: w + '%', background: c }} /></div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 'auto', background: '#00E599', color: '#06231A', textAlign: 'center', padding: '13px 0', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em' }}>ROUTE → MISTRAL LARGE 2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.VariantB = VariantB;
