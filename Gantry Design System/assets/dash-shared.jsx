/* ============================================================
   GANTRY Dashboard — shared data, icons, primitives
   ============================================================ */

const fmtUSD = (n, dec = 0) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
const fmtCompact = (n) => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(0) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return '' + n;
};

/* ---- date-range multipliers so the picker actually changes data ---- */
const RANGES = {
  '24h': { label: 'Last 24 hours', mult: 0.034, points: 24, xs: ['00:00','06:00','12:00','18:00','now'] },
  '7d':  { label: 'Last 7 days',   mult: 0.24,  points: 28, xs: ['Mon','Wed','Fri','Sun'] },
  '30d': { label: 'Last 30 days',  mult: 1,     points: 30, xs: ['May 1','May 14','May 28'] },
  '90d': { label: 'Last 90 days',  mult: 3.02,  points: 30, xs: ['Mar','Apr','May'] },
};

/* deterministic pseudo-random so charts are stable across renders */
function series(seed, n, base, amp) {
  const out = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    const s = Math.sin(seed + i * 0.7) + Math.sin(seed * 1.7 + i * 0.31) * 0.6;
    v = base + s * amp + (i / n) * amp * 0.8;
    out.push(Math.max(base * 0.4, v));
  }
  return out;
}

const DATA = {
  project: { name: 'payments-api', env: 'production', region: 'us-east-1' },
  projects: ['payments-api', 'support-copilot', 'docs-search', 'fraud-engine'],

  kpis: {
    '30d': { cost: 128430.24, costDelta: -12.4, tokens: 1.94e9, tokenDelta: 8.1, p95: 842, reqs: 4.21e6, reqDelta: 5.4, errRate: 0.42 },
  },

  models: [
    { name: 'GPT-4o',            vendor: 'openai',   spend: 68430.24, tokens: 812e6, share: 53, p95: '910ms', status: 'ok' },
    { name: 'Claude 3.5 Sonnet', vendor: 'anthropic',spend: 34250.11, tokens: 604e6, share: 27, p95: '740ms', status: 'ok' },
    { name: 'Gemini 1.5 Pro',    vendor: 'google',   spend: 15720.10, tokens: 388e6, share: 12, p95: '1.2s',  status: 'warn' },
    { name: 'Mistral Large 2',   vendor: 'mistral',  spend: 10028.79, tokens: 140e6, share: 8,  p95: '680ms', status: 'ok' },
  ],

  /* Model Advisor — per feature tag */
  features: [
    {
      id: 'summarization', tag: 'summarization', current: 'GPT-4o', volume: '142M tok / mo',
      calls: '1.2M calls', quality: 92,
      options: [
        { model: 'GPT-4o',            cost: 24800, eval: 92.4, current: true },
        { model: 'Claude 3.5 Haiku',  cost: 6200,  eval: 91.2, recommended: true },
        { model: 'Gemini 1.5 Flash',  cost: 4120,  eval: 87.6 },
      ],
    },
    {
      id: 'chat-support', tag: 'chat-support', current: 'Claude 3.5 Sonnet', volume: '410M tok / mo',
      calls: '3.4M calls', quality: 96,
      options: [
        { model: 'Claude 3.5 Sonnet', cost: 34250, eval: 96.1, current: true },
        { model: 'GPT-4o mini',       cost: 9800,  eval: 93.4, recommended: true },
        { model: 'Llama 3.1 70B',     cost: 7300,  eval: 90.2 },
      ],
    },
    {
      id: 'classification', tag: 'classification', current: 'GPT-4o', volume: '88M tok / mo',
      calls: '6.1M calls', quality: 89,
      options: [
        { model: 'GPT-4o',           cost: 14600, eval: 89.0, current: true },
        { model: 'Mistral Large 2',  cost: 3900,  eval: 88.1, recommended: true },
        { model: 'GPT-4o mini',      cost: 2100,  eval: 84.7 },
      ],
    },
    {
      id: 'extraction', tag: 'extraction', current: 'Gemini 1.5 Pro', volume: '64M tok / mo',
      calls: '920K calls', quality: 91,
      options: [
        { model: 'Gemini 1.5 Pro',   cost: 15720, eval: 91.0, current: true },
        { model: 'Gemini 1.5 Flash', cost: 5100,  eval: 89.4, recommended: true },
        { model: 'Claude 3.5 Haiku', cost: 6600,  eval: 90.1 },
      ],
    },
  ],

  alerts: [
    { id: 1, sev: 'error', title: 'Cost spike · payments-api', body: 'GPT-4o spend +31% in last hour vs. 7-day baseline.', time: '14m ago', tag: 'summarization' },
    { id: 2, sev: 'warning', title: 'Budget threshold · support-copilot', body: 'Reached 82% of $40,000 monthly budget.', time: '1h ago', tag: 'chat-support' },
    { id: 3, sev: 'ok', title: 'Recommendation applied', body: 'classification routed to Mistral Large 2. Est. −$10,700/mo.', time: '3h ago', tag: 'classification' },
    { id: 4, sev: 'warning', title: 'Latency · Gemini 1.5 Pro', body: 'p95 latency 1.2s, above 1.0s SLA for 22 min.', time: '5h ago', tag: 'extraction' },
  ],

  features_top: [
    { tag: 'chat-support', cost: 34250, share: 27 },
    { tag: 'summarization', cost: 24800, share: 19 },
    { tag: 'classification', cost: 14600, share: 11 },
    { tag: 'extraction', cost: 15720, share: 12 },
    { tag: 'search-rerank', cost: 9800, share: 8 },
  ],
};

const VENDOR = {
  openai:    { c: '#10A37F', label: 'OAI' },
  anthropic: { c: '#D08770', label: 'ANT' },
  google:    { c: '#5B9DFF', label: 'GEM' },
  mistral:   { c: '#F5B544', label: 'MST' },
  meta:      { c: '#8AB4F8', label: 'LMA' },
};
function vendorOf(model) {
  const m = model.toLowerCase();
  if (m.includes('gpt') || m.includes('o1')) return 'openai';
  if (m.includes('claude')) return 'anthropic';
  if (m.includes('gemini')) return 'google';
  if (m.includes('mistral')) return 'mistral';
  if (m.includes('llama')) return 'meta';
  return 'openai';
}

/* ============================================================
   Icons (stroke, 24-grid)
   ============================================================ */
const Ico = {
  grid:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>,
  chart:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/></svg>,
  bell:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.5 21a1.7 1.7 0 0 1-3 0"/></svg>,
  spark:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>,
  layers: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" {...p}><path d="M12 3 2 8l10 5 10-5z"/><path d="M2 13l10 5 10-5"/></svg>,
  cog:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>,
  book:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 0 2 2h13"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>,
  cal:    (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>,
  chev:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="m6 9 6 6 6-6"/></svg>,
  check:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  warn:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>,
  bolt:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>,
  arrow:  (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  plus:   (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  x:      (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  dl:     (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="M12 3v12M7 11l5 5 5-5M5 21h14"/></svg>,
};

/* ---- Gantry mark ---- */
function Mark({ size = 24, color = '#fff', accent = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: 'block' }}>
      <path d="M14 5 V43 M14 30 L34 13" stroke={color} strokeWidth="3.4" strokeLinecap="square"/>
      <path d="M34 13 V43" stroke={accent ? '#00E599' : color} strokeWidth="3.4" strokeLinecap="square"/>
    </svg>
  );
}

/* ---- Sparkline / area line chart ---- */
function AreaLine({ data, w = 720, h = 180, stroke = '#00E599', id = 'g', pad = 6 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const rng = max - min || 1;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, pad + (h - pad * 2) * (1 - (v - min) / rng)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={'fill-' + id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.20"/>
          <stop offset="1" stopColor={stroke} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <g stroke="rgba(255,255,255,0.06)">
        {[0.25, 0.5, 0.75].map((f) => <line key={f} x1="0" y1={h * f} x2={w} y2={h * f}/>)}
      </g>
      <path d={area} fill={`url(#fill-${id})`}/>
      <path d={line} fill="none" stroke={stroke} strokeWidth="2" vectorEffect="non-scaling-stroke"/>
    </svg>
  );
}

/* ---- mini sparkline (no axis) ---- */
function Spark({ data, w = 80, h = 28, stroke = 'rgba(255,255,255,0.4)' }) {
  const max = Math.max(...data), min = Math.min(...data);
  const rng = max - min || 1;
  const step = w / (data.length - 1);
  const line = data.map((v, i) => (i ? 'L' : 'M') + (i * step).toFixed(1) + ',' + (2 + (h - 4) * (1 - (v - min) / rng)).toFixed(1)).join(' ');
  return <svg width={w} height={h} style={{ display: 'block' }}><path d={line} fill="none" stroke={stroke} strokeWidth="1.6"/></svg>;
}

/* ---- corner-bracket frame overlay ---- */
function Brackets({ color }) {
  const st = color ? { borderColor: color } : null;
  return (<><span className="gy-c tl" style={st} /><span className="gy-c tr" style={st} /><span className="gy-c bl" style={st} /><span className="gy-c br" style={st} /></>);
}

Object.assign(window, { DATA, RANGES, VENDOR, vendorOf, Ico, Mark, Brackets, AreaLine, Spark, fmtUSD, fmtCompact, series });
