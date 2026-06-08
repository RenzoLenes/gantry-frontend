'use client';

import * as React from 'react';
import DottedMap from 'dotted-map';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { TrendingUp, AlertTriangle, DollarSign, Zap } from 'lucide-react';

// ── Map ──────────────────────────────────────────────────────
const dottedMap = new DottedMap({ height: 55, grid: 'diagonal' });
const mapPoints = dottedMap.getPoints();

const hotspots: [number, number][] = [
  [28, 22], [76, 18], [97, 32], [56, 36], [48, 16], [112, 28],
];

function GlobeMap() {
  return (
    <svg viewBox="0 0 120 60" className="w-full h-auto" style={{ color: 'var(--accent)' }}>
      {mapPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={0.15} fill="currentColor" opacity={0.35} />
      ))}
      {hotspots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={0.85} fill="var(--accent)" />
      ))}
    </svg>
  );
}

// ── Chart ─────────────────────────────────────────────────────
const chartData = [
  { month: 'Jan', gpt4: 420, claude: 180 },
  { month: 'Feb', gpt4: 510, claude: 240 },
  { month: 'Mar', gpt4: 380, claude: 310 },
  { month: 'Apr', gpt4: 690, claude: 280 },
  { month: 'May', gpt4: 820, claude: 350 },
  { month: 'Jun', gpt4: 710, claude: 490 },
];

const chartConfig = {
  gpt4:   { label: 'GPT-4o',  color: '#00E599' },
  claude: { label: 'Claude',  color: 'rgba(0,229,153,0.45)' },
} satisfies ChartConfig;

// ── Traces ────────────────────────────────────────────────────
type TraceStatus = 'spike' | 'slow' | 'ok';

const traces: { ts: string; endpoint: string; model: string; cost: string; lat: string; status: TraceStatus }[] = [
  { ts: '14:32:01', endpoint: '/api/summarize',    model: 'gpt-4o',       cost: '$0.042', lat: '1.2s', status: 'spike' },
  { ts: '14:32:04', endpoint: '/api/autocomplete', model: 'gpt-4o',       cost: '$0.038', lat: '4.8s', status: 'slow'  },
  { ts: '14:32:09', endpoint: '/api/classify',     model: 'claude-haiku', cost: '$0.003', lat: '0.4s', status: 'ok'    },
];

const statusMeta: Record<TraceStatus, { label: string; cls: string }> = {
  spike: { label: 'SPIKE', cls: 'prob-trace-badge--spike' },
  slow:  { label: 'SLOW',  cls: 'prob-trace-badge--slow'  },
  ok:    { label: 'OK',    cls: 'prob-trace-badge--ok'    },
};

// ── Component ─────────────────────────────────────────────────
export default function Problem() {
  return (
    <section className="lp-sec">
      <div className="lp-wrap">
        <ScrollReveal>
          <h2 className="lp-h2">
            The problem is structural,<br />not a missing dashboard.
          </h2>
        </ScrollReveal>

        <div className="prob-bento">

          {/* 1 — Map (top-left) */}
          <div className="prob-bcell prob-bcell--map">
            <span className="prob-blabel">
              <span className="prob-blabel-pip" />
              Global API traffic
            </span>
            <h3 className="prob-bh">
              Your LLM spend is split across dozens of features.{' '}
              <span className="prob-bh--dim">You can't see which one is the problem.</span>
            </h3>
            <div className="prob-map-wrap">
              <span className="prob-map-badge">🌐 Last spike from GPT-4o autocomplete</span>
              <GlobeMap />
            </div>
          </div>

          {/* 2 — Alerts (top-right) */}
          <div className="prob-bcell prob-bcell--alerts">
            <span className="prob-blabel">
              <AlertTriangle size={13} />
              Live monitoring
              <span className="prob-sample-tag">Sample data</span>
            </span>
            <h3 className="prob-bh">
              GPT-4o on a simple autocomplete costs 10× more than it needs to.{' '}
              <span className="prob-bh--dim">You won't know until you compare real traffic.</span>
            </h3>
            <div className="prob-monitor">
              <div className="prob-monitor-fade" />
              {traces.map((t, i) => {
                const s = statusMeta[t.status];
                return (
                  <div
                    key={i}
                    className="prob-trace animate-scaleUp"
                    style={{ animationDelay: `${i * 200}ms`, animationFillMode: 'forwards', opacity: 0 }}
                  >
                    <div className="prob-trace-top">
                      <code className="prob-trace-ts">{t.ts}</code>
                      <code className="prob-trace-endpoint">{t.endpoint}</code>
                      <span className={`prob-trace-badge ${s.cls}`}>{s.label}</span>
                    </div>
                    <div className="prob-trace-bottom">
                      <code className="prob-trace-model">{t.model}</code>
                      <code className="prob-trace-stat">{t.cost}</code>
                      <span className="prob-trace-sep">·</span>
                      <code className="prob-trace-stat">{t.lat}</code>
                    </div>
                  </div>
                );
              })}
              <div className="prob-monitor-footer">
                <span>$0.143 tracked · 6 calls · last 30s</span>
                <span className="prob-monitor-saved">routing saved ~$0.08</span>
              </div>
            </div>
          </div>

          {/* 3 — Chart (bottom-left) */}
          <div className="prob-bcell prob-bcell--chart">
            <span className="prob-blabel">
              <TrendingUp size={13} />
              Cost by model · last 6 months
            </span>
            <h3 className="prob-bh">
              Your latency looks fine at p50. At p95 it's breaking your UX.{' '}
              <span className="prob-bh--dim">Nobody's measuring it per feature because there's no easy way.</span>
            </h3>
            <div className="prob-chart-wrap">
              <ChartContainer className="h-44 w-full" config={chartConfig}>
                <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="probFillGpt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#00E599" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#00E599" stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="probFillClaude" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="#00E599" stopOpacity={0.2}  />
                      <stop offset="100%" stopColor="#00E599" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <XAxis hide />
                  <YAxis hide />
                  <CartesianGrid vertical={false} horizontal={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Area strokeWidth={2}   dataKey="gpt4"   type="monotone" fill="url(#probFillGpt)"    stroke="#00E599" />
                  <Area strokeWidth={1.5} dataKey="claude" type="monotone" fill="url(#probFillClaude)" stroke="rgba(0,229,153,0.5)" />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>

          {/* 4 — Feature cards (bottom-right) */}
          <div className="prob-bcell prob-bcell--feats">
            <div className="prob-feat-card">
              <div className="prob-feat-icon"><DollarSign size={14} /></div>
              <span className="prob-feat-tag">Cost attribution</span>
              <h4 className="prob-feat-h">
                Per feature, per model, per call.{' '}
                <span className="prob-feat-h--dim">Aggregate spend isn't enough. Know exactly which endpoint is bleeding money.</span>
              </h4>
            </div>
            <div className="prob-feat-card">
              <div className="prob-feat-icon"><Zap size={14} /></div>
              <span className="prob-feat-tag">Latency tracing</span>
              <h4 className="prob-feat-h">
                p95 visibility out of the box.{' '}
                <span className="prob-feat-h--dim">Tag and trace LLM calls at the granularity your team actually needs.</span>
              </h4>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
