'use client';

import { useRef } from 'react';
import type { MouseEvent } from 'react';

/* ── Provider logos ────────────────────────────────────────── */
const OpenAIIcon = () => (
  <svg width="18" height="18" viewBox="0 0 256 260" fill="currentColor">
    <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
  </svg>
);
const AnthropicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
  </svg>
);
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const MistralIcon = () => (
  <svg width="18" height="18" viewBox="0 0 256 233" fill="currentColor">
    <path d="M186.18 0h46.55v46.55h-46.55zM209.45 0H256v46.55h-46.55zM0 0h46.55v46.55H0zM0 46.55h46.55V93.1H0zM0 93.09h46.55v46.55H0zM0 139.64h46.55v46.55H0zM0 186.18h46.55v46.55H0z"/>
    <path fill="#F7D046" d="M23.27 0h46.55v46.55H23.27z"/>
    <path fill="#F2A73B" d="M209.45 46.55H256V93.1h-46.55zM23.27 46.55h46.55V93.1H23.27z"/>
    <path d="M139.64 46.55h46.55V93.1h-46.55z"/>
    <path fill="#F2A73B" d="M162.91 46.55h46.55V93.1h-46.55zM69.82 46.55h46.55V93.1H69.82z"/>
    <path fill="#EE792F" d="M116.36 93.09h46.55v46.55h-46.55zM162.91 93.09h46.55v46.55h-46.55zM69.82 93.09h46.55v46.55H69.82z"/>
    <path d="M93.09 139.64h46.55v46.55H93.09z"/>
    <path fill="#EB5829" d="M116.36 139.64h46.55v46.55h-46.55z"/>
    <path fill="#EE792F" d="M209.45 93.09H256v46.55h-46.55zM23.27 93.09h46.55v46.55H23.27z"/>
    <path d="M186.18 139.64h46.55v46.55h-46.55z"/>
    <path fill="#EB5829" d="M209.45 139.64H256v46.55h-46.55z"/>
    <path d="M186.18 186.18h46.55v46.55h-46.55z"/>
    <path fill="#EB5829" d="M23.27 139.64h46.55v46.55H23.27z"/>
    <path fill="#EA3326" d="M209.45 186.18H256v46.55h-46.55zM23.27 186.18h46.55v46.55H23.27z"/>
  </svg>
);

/* ── Glow card wrapper ─────────────────────────────────────── */
function GlowCard({ children, accent = false, style }: {
  children: React.ReactNode;
  accent?: boolean;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    el.setAttribute('data-hover', '1');
  };
  const onLeave = () => ref.current?.removeAttribute('data-hover');
  return (
    <div ref={ref} style={style}
      className={`feat-card${accent ? ' feat-card--accent' : ''}`}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      <div className="prob-cursor-glow" aria-hidden />
      {children}
    </div>
  );
}

/* ── Card visuals ──────────────────────────────────────────── */
const Trace = () => (
  <div className="rounded border border-white/10 bg-zinc-900/80 p-3 font-mono text-xs mt-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-zinc-600">{'// live trace'}</span>
      <span className="rounded-sm border border-white/10 px-1.5 py-0.5 text-[9px] tracking-widest text-zinc-500">SAMPLE</span>
    </div>
    {[
      { tag: 'summarize',  model: 'gpt-4o',     cost: '$0.019', ms: '824ms',   c: 'text-emerald-400' },
      { tag: 'extraction', model: 'gemini-pro',  cost: '$0.007', ms: '432ms',   c: 'text-emerald-400' },
      { tag: 'chat',       model: 'claude-3.5',  cost: '$0.032', ms: '1,411ms', c: 'text-yellow-400'  },
    ].map((r, i) => (
      <div key={i} className="flex gap-2 text-zinc-400 border-t border-white/5 first:border-0 pt-1 first:pt-0">
        <span className="text-emerald-500/60">→</span>
        <span className="w-20 truncate shrink-0">{r.tag}</span>
        <span className="text-zinc-600 truncate shrink-0 hidden sm:block w-24">{r.model}</span>
        <span className={`${r.c} shrink-0 ml-auto`}>{r.cost}</span>
        <span className="text-zinc-600 shrink-0">{r.ms}</span>
      </div>
    ))}
  </div>
);

const AdvisorBars = () => (
  <div className="rounded border border-white/10 bg-zinc-900/80 p-3 font-mono text-xs mt-4 space-y-2">
    <div className="text-zinc-500 mb-1">monthly cost · 100M tokens/mo</div>
    {[
      { name: 'GPT-4o',        pct: '100%', cost: '$1.5k', accent: false },
      { name: 'Mistral Large', pct: '20%',  cost: '$300',  accent: true  },
    ].map((b, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="w-24 text-zinc-400 shrink-0">{b.name}</span>
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className={`h-full rounded-full ${b.accent ? 'bg-emerald-400' : 'bg-zinc-600'}`} style={{ width: b.pct }} />
        </div>
        <span className={`w-14 text-right shrink-0 ${b.accent ? 'text-emerald-400' : 'text-zinc-300'}`}>{b.cost}</span>
      </div>
    ))}
    <div className="pt-1 border-t border-white/10 flex justify-between">
      <span className="text-zinc-500">savings</span>
      <span className="text-emerald-400 font-semibold">−$1.2k/mo</span>
    </div>
  </div>
);

const Logos = () => (
  <div className="flex flex-wrap gap-2 mt-4">
    {[
      { name: 'OpenAI',    icon: <OpenAIIcon /> },
      { name: 'Anthropic', icon: <AnthropicIcon /> },
      { name: 'Google',    icon: <GoogleIcon /> },
      { name: 'Mistral',   icon: <MistralIcon /> },
    ].map((p) => (
      <div key={p.name}
        className="w-12 h-12 flex items-center justify-center rounded-sm border border-white/10 bg-zinc-900/60"
        title={p.name}
      >
        <div className="text-white/80">{p.icon}</div>
      </div>
    ))}
    <div className="w-12 h-12 flex items-center justify-center rounded-sm border border-dashed border-white/10">
      <span className="font-mono text-[9px] text-zinc-600 text-center leading-tight px-1">+any</span>
    </div>
    <p className="w-full font-mono text-[11px] text-zinc-600 mt-1">+ any OpenAI-compatible endpoint</p>
  </div>
);

const AlertDemo = () => (
  <div className="rounded border border-white/10 bg-zinc-900/80 p-3 font-mono text-xs mt-4">
    <div className="flex items-center gap-2 text-zinc-300">
      <span className="text-yellow-400 shrink-0">⚠</span>
      <span className="truncate">/api/summarize</span>
      <span className="text-zinc-600 shrink-0">·</span>
      <span className="text-yellow-400 shrink-0">+312%</span>
      <span className="text-zinc-600 truncate hidden sm:block">vs 7d avg</span>
      <span className="text-zinc-300 shrink-0 ml-auto">$0.042/call</span>
    </div>
  </div>
);

const AttributionBars = () => (
  <div className="rounded border border-white/10 bg-zinc-900/80 p-3 font-mono text-xs mt-4 space-y-2">
    <div className="text-zinc-500 mb-1">spend by feature</div>
    {[
      { name: 'summarize',  pct: '48%' },
      { name: 'chat',       pct: '31%' },
      { name: 'extraction', pct: '21%' },
    ].map((b, i) => (
      <div key={i} className="flex items-center gap-2">
        <span className="w-20 text-zinc-400 shrink-0 truncate">{b.name}</span>
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-emerald-400" style={{ width: b.pct }} />
        </div>
        <span className="w-10 text-right shrink-0 text-zinc-300">{b.pct}</span>
      </div>
    ))}
  </div>
);

/* ── Icon shorthand ────────────────────────────────────────── */
const Ico = ({ d }: { d: string }) => (
  <div className="feat-icon">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d={d} />
    </svg>
  </div>
);

/* ── Main export ───────────────────────────────────────────── */
export function GantryFeatures() {
  return (
    <div className="prob-grid feat-grid">

      {/* 01 */}
      <GlowCard>
        <span className="prob-ix">01</span>
        <Ico d="M3 3v18h18 M7 14l4-4 3 3 5-6" />
        <h3 className="feat-title">Real-time cost tracing</h3>
        <p className="prob-body">Cost, tokens, and latency for every request, broken down by model, feature tag, and environment.</p>
        <Trace />
      </GlowCard>

      {/* 02 */}
      <GlowCard accent>
        <span className="prob-ix">02</span>
        <Ico d="M13 2 4 14h7l-1 8 9-12h-7z" />
        <h3 className="feat-title">Model Advisor</h3>
        <p className="prob-body">Replays your real traffic against cheaper models with eval scores.</p>
        <span className="text-emerald-400 font-mono text-xs mt-1 block">Coming at launch</span>
        <AdvisorBars />
      </GlowCard>

      {/* 03 */}
      <GlowCard>
        <span className="prob-ix">03</span>
        <Ico d="M4 17l6-6-6-6 M12 19h8" />
        <h3 className="feat-title">SDK-native, zero infra</h3>
        <p className="prob-body">One wrap around your existing client. No agents, no sidecars, no proxy to operate.</p>
        <div className="flex items-center gap-2 rounded border border-white/10 bg-zinc-900/80 px-3 py-2.5 font-mono text-xs text-zinc-300 mt-4">
          <span className="text-zinc-500">$</span>
          <span>npm install <span className="text-emerald-400">@gantry/sdk</span></span>
        </div>
      </GlowCard>

      {/* 04 */}
      <GlowCard>
        <span className="prob-ix">04</span>
        <Ico d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M3 10h18" />
        <h3 className="feat-title">Every provider, one view</h3>
        <p className="prob-body">OpenAI, Anthropic, Google, Mistral, and any OpenAI-compatible endpoint, normalized into a single ledger.</p>
        <Logos />
      </GlowCard>

      {/* 05 */}
      <GlowCard>
        <span className="prob-ix">05</span>
        <Ico d="M12 9v4 M12 17h.01 M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <h3 className="feat-title">Spike &amp; budget alerts</h3>
        <p className="prob-body">Set per-feature and per-model budgets. Get alerted the moment spend spikes — before it shows up on the invoice.</p>
        <AlertDemo />
      </GlowCard>

      {/* 06 */}
      <GlowCard>
        <span className="prob-ix">06</span>
        <Ico d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4 M9 3v18 M13 7h6 M13 12h6 M13 17h6" />
        <h3 className="feat-title">Per-feature attribution</h3>
        <p className="prob-body">Tag every call with a feature name. See exactly which feature, model, and environment is driving cost — no guessing from aggregate bills.</p>
        <AttributionBars />
      </GlowCard>

    </div>
  );
}
