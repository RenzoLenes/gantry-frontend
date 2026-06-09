'use client';

import { forwardRef, useState, useRef, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';

/** Native width the dashboard is designed at; it scales down to fit narrower viewports. */
const DESIGN_W = 1120;

/** useLayoutEffect on the client, useEffect on the server (avoids the SSR warning). */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* ── mini sparkline ── */
const Spark = ({ data, stroke = 'rgba(255,255,255,0.4)', w = 72, h = 26 }: { data: number[]; stroke?: string; w?: number; h?: number }) => {
  const max = Math.max(...data), min = Math.min(...data), rng = max - min || 1;
  const step = w / (data.length - 1);
  const line = data.map((v, i) => `${i ? 'L' : 'M'}${(i * step).toFixed(1)},${(2 + (h - 4) * (1 - (v - min) / rng)).toFixed(1)}`).join(' ');
  return <svg width={w} height={h} style={{ display: 'block' }}><path d={line} fill="none" stroke={stroke} strokeWidth="1.6" /></svg>;
};

const mono = 'var(--font-mono, monospace)';

type Page = 'Overview' | 'Usage' | 'Alerts' | 'Budgets' | 'Advisor';

const KPIS = [
  { label: 'Total cost',       value: '$128,430', delta: '▼ 12.4%', good: true,  spark: [40,52,46,60,55,68,62,74,70,82,78,90], sparkC: 'rgba(0,229,153,0.5)' },
  { label: 'Tokens processed', value: '1.94B',    delta: '▲ 8.1%',  good: false, spark: [30,42,38,50,44,58,66,60,72,68,80,86], sparkC: 'rgba(255,255,255,0.32)' },
  { label: 'Requests',         value: '4.21M',    delta: '▲ 5.4%',  good: false, spark: [50,46,58,54,64,60,70,66,74,80,76,84], sparkC: 'rgba(255,255,255,0.32)' },
  { label: 'p95 latency',      value: '842', unit: 'ms', badge: 'within SLA' },
];

/* Model Advisor — classification feature */
const ADVISOR = {
  tag: 'classification',
  current: 'GPT-4o',
  volume: '88M tok / mo',
  calls: '6.1M calls',
  save: '$10,700',
  pct: 73,
  annual: '$128,400',
  options: [
    { model: 'GPT-4o',          cost: '$14,600', bar: 100, eval: '89.0%', vendor: '#10A37F', current: true  },
    { model: 'Mistral Large 2', cost: '$3,900',  bar: 27,  eval: '88.1%', vendor: '#F5B544', rec: true     },
    { model: 'GPT-4o mini',     cost: '$2,100',  bar: 14,  eval: '84.7%', vendor: '#10A37F' },
  ],
};

const FEATURE_CHIPS = [
  { tag: 'summarization', save: '−$18.6K' },
  { tag: 'chat-support',  save: '−$24.5K' },
  { tag: 'classification',save: '−$10.7K', active: true },
  { tag: 'extraction',    save: '−$10.6K' },
];

/* ── Usage page data — per-model costs sum to the $128,430 total / 1.94B tokens ── */
const USAGE_MODELS = [
  { model: 'GPT-4o',          vendor: '#10A37F', tokens: '812M', cost: '$58,240', bar: 100 },
  { model: 'Claude 3.5',      vendor: '#D4A27F', tokens: '498M', cost: '$31,900', bar: 55  },
  { model: 'Gemini 1.5 Pro',  vendor: '#4285F4', tokens: '171M', cost: '$18,300', bar: 31  },
  { model: 'Mistral Large 2', vendor: '#F5B544', tokens: '366M', cost: '$11,200', bar: 19  },
  { model: 'GPT-4o mini',     vendor: '#10A37F', tokens: '93M',  cost: '$8,790',  bar: 15  },
];

const USAGE_FEATURES = [
  { tag: 'summarization', model: 'GPT-4o',         calls: '1.42M', tokens: '612M', cost: '$42,100', p95: '910ms' },
  { tag: 'chat-support',  model: 'Claude 3.5',     calls: '0.98M', tokens: '486M', cost: '$31,400', p95: '1.2s'  },
  { tag: 'classification',model: 'GPT-4o',         calls: '6.10M', tokens: '88M',  cost: '$14,600', p95: '420ms' },
  { tag: 'extraction',    model: 'Mistral Large',  calls: '0.74M', tokens: '298M', cost: '$10,600', p95: '680ms' },
  { tag: 'embeddings',    model: 'text-embed-3',   calls: '2.31M', tokens: '456M', cost: '$3,940',  p95: '120ms' },
];

/* ── Alerts page data — 2 critical match the sidebar "2" badge ── */
type AlertSev = 'critical' | 'warning' | 'resolved';
const ALERTS: { sev: AlertSev; title: string; body: string; time: string; tag: string; action: string }[] = [
  { sev: 'critical', title: 'Cost spike on /api/summarize', body: '+312% vs 7-day average — now $0.042/call on GPT-4o', time: '4m ago',  tag: 'SPIKE',  action: 'Investigate' },
  { sev: 'critical', title: 'chat-support at 94% of budget',  body: '$18.8K of $20K monthly budget consumed · 6 days left', time: '1h ago',  tag: 'BUDGET', action: 'Raise budget' },
  { sev: 'warning',  title: 'p95 latency degraded on extraction', body: '1.8s p95, up from 0.9s — Mistral Large · us-east-1', time: '3h ago', tag: 'SLOW',   action: 'View traces' },
  { sev: 'resolved', title: 'Routing saved $1.2K overnight',  body: 'classification auto-routed GPT-4o → Mistral Large 2', time: '9h ago',  tag: 'SAVED',  action: 'View' },
];

const SEV_META: Record<AlertSev, { color: string; soft: string; line: string }> = {
  critical: { color: 'var(--error)',  soft: 'rgba(255,92,92,0.12)',  line: 'rgba(255,92,92,0.3)' },
  warning:  { color: '#F5B544',       soft: 'rgba(245,181,68,0.12)', line: 'rgba(245,181,68,0.3)' },
  resolved: { color: 'var(--accent)', soft: 'var(--accent-soft)',    line: 'var(--accent-line)' },
};

/* ── Budgets page data ── */
const BUDGETS = [
  { tag: 'summarization', spent: '$42.1K', limit: '$60K', pct: 70, model: 'GPT-4o' },
  { tag: 'chat-support',  spent: '$18.8K', limit: '$20K', pct: 94, model: 'Claude 3.5' },
  { tag: 'classification',spent: '$14.6K', limit: '$36K', pct: 41, model: 'GPT-4o' },
  { tag: 'extraction',    spent: '$10.6K', limit: '$18K', pct: 59, model: 'Mistral Large' },
];

const NAV: { group: string; items: { ix: string; label: Page; accent?: boolean }[] }[] = [
  { group: 'Monitor', items: [{ ix: '01', label: 'Overview' }, { ix: '02', label: 'Usage' }, { ix: '03', label: 'Alerts' }] },
  { group: 'Control', items: [{ ix: '04', label: 'Budgets' }, { ix: '05', label: 'Advisor', accent: true }] },
];

const PAGE_META: Record<Page, string> = {
  Overview: 'Cost, tokens and latency across every model',
  Usage:    'Spend and volume broken down by model and feature',
  Alerts:   'Spikes and budget breaches as they happen',
  Budgets:  'Per-feature and per-model spend limits',
  Advisor:  'Cheaper models that hold quality on your traffic',
};

/* ════════════════════════ shared bits ════════════════════════ */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: mono, marginBottom: 12 }}>{children}</div>
);

const Card = ({ children, accent = false, style }: { children: React.ReactNode; accent?: boolean; style?: React.CSSProperties }) => (
  <div style={{ position: 'relative', background: 'var(--bg-inset)', border: `1px solid ${accent ? 'var(--accent-line)' : 'var(--hair)'}`, borderRadius: 6, padding: '20px 22px', ...style }}>
    {children}
  </div>
);

/* ════════════════════════ pages ════════════════════════ */
function OverviewPage() {
  return (
    <>
      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {KPIS.map(k => (
          <div key={k.label} style={{ position: 'relative', background: 'var(--bg-inset)', border: '1px solid var(--hair)', borderRadius: 6, padding: '14px 14px 12px' }}>
            <p style={{ fontSize: 11, color: 'var(--text-2)', margin: '0 0 10px' }}>{k.label}</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
              <p style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, margin: 0, color: 'var(--text-0)' }}>
                {k.value}{k.unit && <span style={{ fontSize: 13, color: 'var(--text-2)', marginLeft: 2 }}>{k.unit}</span>}
              </p>
              {k.spark && <Spark data={k.spark} stroke={k.sparkC} />}
            </div>
            <div style={{ marginTop: 9, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: mono }}>
              {k.delta && <span style={{ color: k.good ? 'var(--accent)' : 'var(--text-2)' }}>{k.delta}</span>}
              {k.badge && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--accent)', background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', borderRadius: 999, padding: '1px 7px' }}><span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />{k.badge}</span>}
              {k.delta && <span style={{ color: 'var(--text-3)' }}>vs prior</span>}
            </div>
          </div>
        ))}
      </div>

      <AdvisorBlock />
    </>
  );
}

function AdvisorBlock() {
  return (
    <Card accent style={{ padding: '20px 22px' }}>
      {/* head */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: 'var(--text-0)' }}>Model Advisor</h3>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--accent)', background: 'var(--accent-soft)', border: '1px solid var(--accent-line)', borderRadius: 999, padding: '1px 7px' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', animation: 'gy-pip-pulse 2.4s ease-in-out infinite' }} />Live
              </span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>Cheaper models that hold quality on your traffic</div>
          </div>
        </div>
        <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--text-3)' }}>updated 4m ago</span>
      </div>

      {/* feature chips */}
      <div style={{ display: 'flex', gap: 8, margin: '18px 0 20px', flexWrap: 'wrap' }}>
        {FEATURE_CHIPS.map(c => (
          <div key={c.tag} style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '6px 11px', borderRadius: 4, cursor: 'default',
            background: c.active ? 'var(--bg-2)' : 'var(--bg-1)',
            border: `1px solid ${c.active ? 'var(--accent-line)' : 'var(--border)'}`,
            color: c.active ? 'var(--text-0)' : 'var(--text-2)', fontSize: 12,
          }}>
            <span style={{ fontFamily: mono }}>{c.tag}</span>
            <span style={{ fontFamily: mono, fontSize: 11, fontWeight: 600, color: 'var(--accent)' }}>{c.save}</span>
          </div>
        ))}
      </div>

      {/* body */}
      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: 26 }}>
        {/* left — meta + savings */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
            {[['Feature tag', ADVISOR.tag, true], ['Now serving', ADVISOR.current], ['Volume', ADVISOR.volume, true], ['Calls', ADVISOR.calls, true]].map(([k, v, m]) => (
              <div key={k as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{k}</span>
                <span style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 500, fontFamily: m ? mono : 'inherit' }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: '14px 0' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', fontFamily: mono }}>Estimated monthly savings</div>
            <div style={{ fontFamily: mono, fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--accent)', lineHeight: 1, margin: '8px 0' }}>{ADVISOR.save}</div>
            <div style={{ fontSize: 12 }}>
              <span style={{ fontFamily: mono, color: 'var(--accent)' }}>−{ADVISOR.pct}%</span>
              <span style={{ color: 'var(--text-2)' }}> · {ADVISOR.annual}/yr · 88.1% eval vs 89%</span>
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', height: 40, fontSize: 13 }}>
            Route {ADVISOR.tag} → Mistral Large 2
          </button>
        </div>

        {/* right — comparison bars */}
        <div style={{ paddingLeft: 26, borderLeft: '1px solid var(--border)' }}>
          <SectionLabel>Monthly cost · 3 candidates</SectionLabel>
          {ADVISOR.options.map((o, i) => (
            <div key={o.model} style={{
              display: 'grid', gridTemplateColumns: '186px 1fr 70px 42px', alignItems: 'center', gap: 12,
              padding: '11px 0', borderTop: i ? '1px dashed var(--border)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <ModelLogo model={o.model} size={16} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-0)', whiteSpace: 'nowrap' }}>{o.model}</span>
                {o.current && <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 3, background: 'var(--bg-2)', color: 'var(--text-3)', border: '1px solid var(--border)' }}>current</span>}
                {o.rec && <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 3, background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--accent-line)' }}>rec</span>}
              </div>
              <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-3)', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 999, width: `${o.bar}%`, background: o.rec ? 'var(--accent)' : o.current ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.22)' }} />
              </div>
              <span style={{ fontFamily: mono, fontSize: 13, textAlign: 'right', color: o.rec ? 'var(--accent)' : 'var(--text-1)' }}>{o.cost}</span>
              <span style={{ fontFamily: mono, fontSize: 12, textAlign: 'right', color: 'var(--text-3)' }}>{o.eval}</span>
            </div>
          ))}
          <p style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--text-3)', margin: '14px 0 0', maxWidth: 520 }}>
            Estimates replay your last 30 days of traffic against published vendor pricing and Gantry&apos;s eval suite. Routing affects new requests only.
          </p>
        </div>
      </div>
    </Card>
  );
}

/* Maps a model name to its vendor logo (falls back to a neutral chip). */
const MODEL_LOGOS: { match: RegExp; src: string; alt: string }[] = [
  { match: /gpt|text-embed|embed|davinci|openai/i, src: '/logos/openai.svg',  alt: 'OpenAI'  },
  { match: /claude|anthropic/i,                    src: '/logos/claude.svg',  alt: 'Anthropic Claude' },
  { match: /gemini|palm|google/i,                  src: '/logos/gemini.svg',  alt: 'Google Gemini' },
  { match: /mistral|mixtral/i,                      src: '/logos/mistral.svg', alt: 'Mistral' },
];

function ModelLogo({ model, size = 18 }: { model: string; size?: number }) {
  const hit = MODEL_LOGOS.find(l => l.match.test(model));
  if (!hit) {
    return <span style={{ width: size, height: size, borderRadius: 3, background: 'var(--bg-3)', flexShrink: 0, display: 'inline-block' }} />;
  }
  return (
    <Image
      src={hit.src}
      alt={hit.alt}
      width={size}
      height={size}
      unoptimized
      style={{ flexShrink: 0, objectFit: 'contain' }}
    />
  );
}

function UsagePage() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* spend by model */}
        <Card>
          <SectionLabel>Spend by model · last 30 days</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {USAGE_MODELS.map(m => (
              <div key={m.model} style={{ display: 'grid', gridTemplateColumns: '150px 1fr 64px', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0 }}>
                  <ModelLogo model={m.model} size={18} />
                  <span style={{ fontSize: 12, color: 'var(--text-0)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.model}</span>
                  <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-3)', marginLeft: 'auto' }}>{m.tokens}</span>
                </div>
                <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, width: `${m.bar}%`, background: m.vendor, opacity: 0.85 }} />
                </div>
                <span style={{ fontFamily: mono, fontSize: 12, textAlign: 'right', color: 'var(--text-1)' }}>{m.cost}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* tokens trend */}
        <Card>
          <SectionLabel>Tokens processed · daily</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
            <span style={{ fontFamily: mono, fontSize: 26, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-0.02em' }}>1.94B</span>
            <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--accent)' }}>▲ 8.1%</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)' }}>vs prior 30d</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120, marginTop: 14 }}>
            {[42,48,40,55,50,62,58,70,64,76,72,68,80,74,86,82,90,84,78,88,92,86,94,90].map((v, i) => (
              <div key={i} style={{ flex: 1, height: `${v}%`, borderRadius: 2, background: i % 4 === 3 ? 'var(--accent)' : 'rgba(0,229,153,0.28)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontFamily: mono, fontSize: 10, color: 'var(--text-4)' }}>
            <span>May 09</span><span>May 23</span><span>Jun 07</span>
          </div>
        </Card>
      </div>

      {/* top features table */}
      <Card style={{ padding: '18px 22px' }}>
        <SectionLabel>Top features by cost</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 0.8fr 0.8fr 0.9fr 0.7fr', gap: 12, padding: '0 0 10px', borderBottom: '1px solid var(--border)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-4)', fontFamily: mono }}>
          <span>Feature</span><span>Model</span><span style={{ textAlign: 'right' }}>Calls</span><span style={{ textAlign: 'right' }}>Tokens</span><span style={{ textAlign: 'right' }}>Cost</span><span style={{ textAlign: 'right' }}>p95</span>
        </div>
        {USAGE_FEATURES.map((f, i) => (
          <div key={f.tag} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.2fr 0.8fr 0.8fr 0.9fr 0.7fr', gap: 12, alignItems: 'center', padding: '11px 0', borderTop: i ? '1px dashed var(--border)' : 'none', fontSize: 12 }}>
            <span style={{ fontFamily: mono, color: 'var(--text-0)' }}>{f.tag}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--text-2)', minWidth: 0 }}>
              <ModelLogo model={f.model} size={14} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.model}</span>
            </span>
            <span style={{ fontFamily: mono, textAlign: 'right', color: 'var(--text-2)' }}>{f.calls}</span>
            <span style={{ fontFamily: mono, textAlign: 'right', color: 'var(--text-2)' }}>{f.tokens}</span>
            <span style={{ fontFamily: mono, textAlign: 'right', color: 'var(--text-0)', fontWeight: 500 }}>{f.cost}</span>
            <span style={{ fontFamily: mono, textAlign: 'right', color: 'var(--text-3)' }}>{f.p95}</span>
          </div>
        ))}
      </Card>
    </>
  );
}

function AlertsPage() {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <SectionLabelInline>2 active · 1 warning · 1 resolved today</SectionLabelInline>
        <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11, color: 'var(--text-3)' }}>auto-refresh · 30s</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ALERTS.map((a, i) => {
          const s = SEV_META[a.sev];
          return (
            <Card key={i} style={{ padding: '14px 16px', borderColor: a.sev === 'critical' ? s.line : 'var(--hair)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ width: 30, height: 30, borderRadius: 5, background: s.soft, border: `1px solid ${s.line}`, color: s.color, display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 1 }}>
                  {a.sev === 'resolved'
                    ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4 M12 17h.01 M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{a.title}</span>
                    <span style={{ fontFamily: mono, fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', padding: '1px 6px', borderRadius: 3, background: s.soft, color: s.color, border: `1px solid ${s.line}` }}>{a.tag}</span>
                    <span style={{ fontFamily: mono, fontSize: 10, color: 'var(--text-4)', marginLeft: 'auto', flexShrink: 0 }}>{a.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4 }}>{a.body}</div>
                </div>
                <button className="btn btn-secondary" style={{ height: 28, fontSize: 11, padding: '0 12px', flexShrink: 0, alignSelf: 'center' }}>{a.action}</button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function BudgetsPage() {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[['Monthly budget', '$134K', null], ['Consumed', '$86.1K', '64%'], ['Projected EOM', '$121K', 'on track']].map(([l, v, t]) => (
          <div key={l as string} style={{ background: 'var(--bg-inset)', border: '1px solid var(--hair)', borderRadius: 6, padding: '14px 16px' }}>
            <p style={{ fontSize: 11, color: 'var(--text-2)', margin: '0 0 8px' }}>{l}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: 'var(--text-0)', letterSpacing: '-0.02em' }}>{v}</span>
              {t && <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--accent)' }}>{t}</span>}
            </div>
          </div>
        ))}
      </div>

      <Card style={{ padding: '18px 22px' }}>
        <SectionLabel>Per-feature budgets</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {BUDGETS.map(b => {
            const over = b.pct >= 90;
            const col = over ? 'var(--error)' : b.pct >= 75 ? '#F5B544' : 'var(--accent)';
            return (
              <div key={b.tag}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 7 }}>
                  <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-0)', fontWeight: 500 }}>{b.tag}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{b.model}</span>
                  {over && <span style={{ fontFamily: mono, fontSize: 9, fontWeight: 600, letterSpacing: '0.06em', padding: '1px 6px', borderRadius: 3, background: 'rgba(255,92,92,0.12)', color: 'var(--error)', border: '1px solid rgba(255,92,92,0.3)' }}>NEAR LIMIT</span>}
                  <span style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-2)', marginLeft: 'auto' }}>
                    <span style={{ color: 'var(--text-0)' }}>{b.spent}</span> / {b.limit}
                  </span>
                </div>
                <div style={{ height: 7, borderRadius: 999, background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, width: `${b.pct}%`, background: col }} />
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn btn-secondary" style={{ height: 34, fontSize: 12, padding: '0 14px', marginTop: 18 }}>+ New budget rule</button>
      </Card>
    </>
  );
}

const SectionLabelInline = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: mono }}>{children}</span>
);

function AdvisorPage() {
  return <AdvisorBlock />;
}

const PAGES: Record<Page, () => React.JSX.Element> = {
  Overview: OverviewPage,
  Usage:    UsagePage,
  Alerts:   AlertsPage,
  Budgets:  BudgetsPage,
  Advisor:  AdvisorPage,
};

/* ════════════════════════ shell ════════════════════════ */
export const HeroProductPreview = forwardRef<HTMLDivElement>((_, ref) => {
  const [page, setPage] = useState<Page>('Overview');
  const PageBody = PAGES[page];

  // Scale the fixed-width dashboard down to fit the available width (mobile/tablet).
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useIsoLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / DESIGN_W));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: '100%' }}>
    <div
      ref={ref}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border-strong)',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,153,0.08)',
        width: DESIGN_W, margin: '0 auto',
        zoom: scale,
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      {/* ═══ app shell ═══ */}
      {/* Fixed height so switching pages from the sidebar never reflows the view. */}
      <div style={{ display: 'grid', gridTemplateColumns: '188px 1fr', height: 640 }}>

        {/* ── sidebar ── */}
        <aside style={{ background: 'var(--bg-inset)', borderRight: '1px solid var(--hair)', display: 'flex', flexDirection: 'column' }}>
          {/* logo */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '16px 16px', borderBottom: '1px solid var(--hair)' }}>
            <Image src="/gantry-logo-horizontal-light.svg" alt="Gantry" width={94} height={30} priority />
          </div>

          {/* project switcher */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '11px 16px', borderBottom: '1px solid var(--hair)', cursor: 'default' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px rgba(0,229,153,0.6)', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: mono, fontSize: 12, color: 'var(--text-0)', fontWeight: 500 }}>payments-api</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>production · us-east-1</div>
              </div>
            </div>
            <span style={{ color: 'var(--text-4)', fontSize: 11 }}>▾</span>
          </div>

          {/* nav */}
          <nav style={{ padding: '10px 8px', flex: 1 }}>
            {NAV.map(g => (
              <div key={g.group} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-4)', padding: '0 8px 6px', fontFamily: mono }}>{g.group}</div>
                {g.items.map(item => {
                  const active = page === item.label;
                  return (
                    <button
                      key={item.ix}
                      type="button"
                      onClick={() => setPage(item.label)}
                      aria-current={active ? 'page' : undefined}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9, width: '100%', textAlign: 'left',
                        padding: '7px 8px', borderRadius: 5, marginBottom: 1, cursor: 'pointer',
                        background: active ? 'var(--bg-2)' : 'transparent',
                        color: active ? 'var(--text-0)' : item.accent ? 'var(--accent)' : 'var(--text-3)',
                        fontWeight: active ? 500 : 400, fontSize: 12,
                        border: 'none', borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
                        fontFamily: 'inherit', transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-1)'; }}
                      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ fontFamily: mono, fontSize: 9, color: 'var(--text-4)', minWidth: 14 }}>{item.ix}</span>
                      {item.label}
                      {item.label === 'Alerts' && <span style={{ marginLeft: 'auto', fontSize: 9, fontFamily: mono, background: 'rgba(255,92,92,0.15)', color: 'var(--error)', border: '1px solid rgba(255,92,92,0.3)', borderRadius: 999, padding: '0 5px' }}>2</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* footer usage */}
          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--hair)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: mono, letterSpacing: '0.06em' }}>Scale plan</span>
              <span style={{ fontSize: 10, color: 'var(--text-2)', fontFamily: mono }}>86%</span>
            </div>
            <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-3)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '86%', borderRadius: 999, background: 'var(--accent)' }} />
            </div>
          </div>
        </aside>

        {/* ── main ── */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* topbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--hair)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <h1 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: 'var(--text-0)' }}>{page}</h1>
              <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.06em', color: 'var(--text-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>§ {PAGE_META[page]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-inset)', border: '1px solid var(--hair)', borderRadius: 5, padding: '6px 10px', fontSize: 11, color: 'var(--text-3)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></svg>
                <span style={{ fontFamily: mono }}>⌘K</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', border: '1px solid var(--border-strong)', borderRadius: 5, padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></svg>
                Last 30 days ▾
              </div>
            </div>
          </div>

          {/* content — re-keyed per page so it fades in on switch.
              flex:1 + minHeight:0 makes this region fill the fixed shell height;
              overflow keeps any taller page scrolling internally instead of
              changing the dashboard's outer height. */}
          <div
            key={page}
            className="dash-scroll"
            style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 16, animation: 'gy-page-in 0.3s ease' }}
          >
            <PageBody />
          </div>
        </div>
      </div>

      <style>{`@keyframes gy-page-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
    </div>
  );
});

HeroProductPreview.displayName = 'HeroProductPreview';
