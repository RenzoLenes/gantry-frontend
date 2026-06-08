/* ============================================================
   Direction C — "Dual-tone"
   Lever: COLOR. Indigo is the product/interaction color
   (CTAs, active nav, focus, brand). Green is RESERVED for
   money saved / positive — "green is always meaningful".
   Warmer-tinted dark, softer cards (color does the work).
   ============================================================ */
function VariantC() {
  const IND = '#6E5BFF', GRN = '#00E599';
  const Mark = ({ s = 22 }) => (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none"><path d="M14 5 V43 M14 30 L34 13" stroke="#fff" strokeWidth="3.4" strokeLinecap="square"/><path d="M34 13 V43" stroke={IND} strokeWidth="3.4" strokeLinecap="square"/></svg>
  );
  const nav = [['Overview', true], ['Usage'], ['Alerts'], ['Budgets'], ['Model Advisor'], ['Settings']];
  const bars = [['GPT-4o', 100, '$14.6K', 'cur'], ['Mistral Large 2', 27, '$3.9K', 'rec'], ['GPT-4o mini', 14, '$2.1K', '']];
  return (
    <div className="vC">
      <style>{`
        .vC{ width:1280px; height:880px; background:#0C0D12; color:#fff; font-family:'Inter',sans-serif; display:flex; overflow:hidden; }
        .vC *{ box-sizing:border-box; }
        .vC-mono{ font-family:'JetBrains Mono',monospace; font-variant-numeric:tabular-nums; }
        .vC-side{ width:220px; flex:none; background:#0A0B0F; border-right:1px solid rgba(255,255,255,0.07); padding:20px 14px; display:flex; flex-direction:column; }
        .vC-logo{ display:flex; align-items:center; gap:11px; padding:4px 8px 20px; }
        .vC-wm{ font-weight:700; letter-spacing:0.22em; font-size:14px; }
        .vC-proj{ display:flex; align-items:center; gap:10px; padding:9px 11px; border:1px solid rgba(255,255,255,0.08); border-radius:9px; margin-bottom:16px; }
        .vC-pdot{ width:7px; height:7px; border-radius:99px; background:${IND}; box-shadow:0 0 8px ${IND}; }
        .vC-glab{ font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.34); padding:0 11px 8px; }
        .vC-ni{ display:flex; align-items:center; gap:11px; padding:9px 11px; border-radius:8px; font-size:14px; font-weight:500; color:rgba(255,255,255,0.55); margin-bottom:2px; }
        .vC-ni .dot{ width:15px; height:15px; border-radius:4px; border:1.6px solid currentColor; opacity:0.5; }
        .vC-ni.on{ background:rgba(110,91,255,0.14); color:#fff; }
        .vC-ni.on .dot{ background:${IND}; border-color:${IND}; opacity:1; }
        .vC-main{ flex:1; min-width:0; display:flex; flex-direction:column; }
        .vC-top{ height:60px; border-bottom:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:space-between; padding:0 28px; }
        .vC-h1{ font-size:18px; font-weight:700; }
        .vC-pill{ font-size:12px; font-weight:600; padding:5px 11px; border-radius:99px; }
        .vC-cta{ background:${IND}; color:#fff; }
        .vC-content{ padding:24px 28px; display:flex; flex-direction:column; gap:16px; flex:1; }
        .vC-kpis{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .vC-card{ background:#15161D; border:1px solid rgba(255,255,255,0.07); border-radius:12px; padding:18px; }
        .vC-klab{ font-size:13px; color:rgba(255,255,255,0.55); }
        .vC-kval{ font-size:30px; font-weight:700; letter-spacing:-0.02em; margin-top:10px; }
        .vC-kd{ font-size:13px; margin-top:8px; font-weight:600; }
        .vC-advisor{ background:linear-gradient(120deg,#16131F,#15161D); border:1px solid rgba(110,91,255,0.4); border-radius:14px; padding:22px 24px; position:relative; overflow:hidden; }
        .vC-aglow{ position:absolute; top:-110px; right:-70px; width:300px; height:300px; background:radial-gradient(circle,rgba(110,91,255,0.22),transparent 66%); }
        .vC-aic{ width:34px; height:34px; border-radius:9px; background:rgba(110,91,255,0.16); border:1px solid rgba(110,91,255,0.4); color:${IND}; display:grid; place-items:center; }
      `}</style>

      <div className="vC-side">
        <div className="vC-logo"><Mark s={22} /><span className="vC-wm">GANTRY</span></div>
        <div className="vC-proj"><span className="vC-pdot" /><div><div className="vC-mono" style={{ fontSize: 13, fontWeight: 600 }}>payments-api</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.34)' }}>production · us-east-1</div></div></div>
        <div className="vC-glab">Monitor</div>
        {nav.map(([l, on]) => <div key={l} className={'vC-ni' + (on ? ' on' : '')}><span className="dot" />{l}</div>)}
        <div style={{ marginTop: 'auto', padding: 12, background: '#15161D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 7 }}><span style={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Scale plan</span><span className="vC-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>86%</span></div>
          <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }}><div style={{ height: 5, width: '86%', background: IND, borderRadius: 99 }} /></div>
        </div>
      </div>

      <div className="vC-main">
        <div className="vC-top">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span className="vC-h1">Overview</span><span className="vC-pill" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}>production</span></div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="vC-pill" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', display: 'flex', alignItems: 'center' }}>Last 30 days ▾</span>
            <span className="vC-pill vC-cta" style={{ display: 'flex', alignItems: 'center' }}>Export</span>
          </div>
        </div>

        <div className="vC-content">
          <div className="vC-kpis">
            {[['Total cost', '$128,430', '▼ 12.4%', GRN], ['Tokens processed', '1.94B', '▲ 8.1%', 'rgba(255,255,255,0.5)'], ['Requests', '4.21M', '▲ 5.4%', 'rgba(255,255,255,0.5)'], ['p95 latency', '842ms', 'within SLA', GRN]].map(([l, v, d, c]) => (
              <div className="vC-card" key={l}><div className="vC-klab">{l}</div><div className="vC-kval vC-mono">{v}</div><div className="vC-kd" style={{ color: c }}>{d}</div></div>
            ))}
          </div>

          <div className="vC-advisor">
            <div className="vC-aglow" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
              <div className="vC-aic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg></div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ fontSize: 18, fontWeight: 700 }}>Model Advisor</span><span className="vC-pill" style={{ background: 'rgba(110,91,255,0.16)', color: IND, fontSize: 11 }}>Live</span></div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>Cheaper models that hold quality on your traffic</div>
              </div>
              <div className="vC-mono" style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.34)' }}>classification</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 28, marginTop: 22, position: 'relative' }}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 13 }}>
                  {[['Now serving', 'GPT-4o'], ['Volume', '88M tok/mo'], ['Calls', '6.1M']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(255,255,255,0.4)' }}>{k}</span><span style={{ fontWeight: 500 }}>{v}</span></div>
                  ))}
                </div>
                <div style={{ paddingTop: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: GRN }}>Estimated monthly savings</div>
                  <div className="vC-mono" style={{ fontSize: 46, fontWeight: 700, color: GRN, letterSpacing: '-0.03em', margin: '6px 0 4px' }}>$10,700</div>
                  <div className="vC-mono" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}><span style={{ color: GRN }}>−73%</span> · 88.1% eval vs 89.0%</div>
                </div>
                <div style={{ marginTop: 20, background: IND, color: '#fff', textAlign: 'center', padding: '12px 0', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>Route classification → Mistral Large 2</div>
              </div>
              <div style={{ paddingLeft: 28, borderLeft: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 16 }}>Monthly cost · 3 candidates</div>
                {bars.map(([nm, w, ct, tag]) => {
                  const isRec = tag === 'rec';
                  const col = isRec ? GRN : tag === 'cur' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.22)';
                  return (
                    <div key={nm} style={{ display: 'grid', gridTemplateColumns: '210px 1fr 70px', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: col }} />
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{nm}</span>
                        {tag && <span className="vC-pill" style={{ fontSize: 10, padding: '2px 6px', textTransform: 'uppercase', letterSpacing: '0.04em', background: isRec ? 'rgba(0,229,153,0.14)' : 'rgba(255,255,255,0.06)', color: isRec ? GRN : 'rgba(255,255,255,0.4)' }}>{isRec ? 'recommended' : 'current'}</span>}
                      </div>
                      <div style={{ height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 99 }}><div style={{ height: 7, width: w + '%', background: col, borderRadius: 99 }} /></div>
                      <div className="vC-mono" style={{ fontSize: 13, textAlign: 'right', color: isRec ? GRN : '#fff' }}>{ct}</div>
                    </div>
                  );
                })}
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.34)', marginTop: 16, lineHeight: 1.55, maxWidth: 520 }}>Estimates replay your last 30 days of traffic against published vendor pricing and Gantry’s eval suite. Routing affects new requests only.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
window.VariantC = VariantC;
