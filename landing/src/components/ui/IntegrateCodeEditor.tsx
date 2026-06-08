'use client';
import { useState } from 'react';

const OPENAI_SNIPPET = `<span class="c">// drop-in: gantry.wrap() returns the same client</span>
<span class="k">const</span> openai = gantry.<span class="fn">wrap</span>(<span class="k">new</span> <span class="fn">OpenAI</span>());

<span class="k">const</span> res = <span class="k">await</span> openai.chat.completions.<span class="fn">create</span>({
  model: <span class="s">'gpt-4o'</span>,
  messages: [{ role: <span class="s">'user'</span>, content: prompt }],
  <span class="p">gantry</span>: {
    feature: <span class="s">'summarization'</span>,
    user: <span class="v">user.id</span>,
  },
});

<span class="c">// → traced automatically. nothing else to do.</span>`;

const ANTHROPIC_SNIPPET = `<span class="c">// same wrap, any provider</span>
<span class="k">const</span> anthropic = gantry.<span class="fn">wrap</span>(<span class="k">new</span> <span class="fn">Anthropic</span>());

<span class="k">const</span> msg = <span class="k">await</span> anthropic.messages.<span class="fn">create</span>({
  model: <span class="s">'claude-3-5-sonnet'</span>,
  max_tokens: <span class="v">1024</span>,
  messages,
  <span class="p">gantry</span>: { feature: <span class="s">'chat-support'</span> },
});`;

const STREAM_SNIPPET = `<span class="c">// streaming is traced too — tokens counted live</span>
<span class="k">const</span> stream = <span class="k">await</span> openai.chat.completions.<span class="fn">create</span>({
  model: <span class="s">'gpt-4o'</span>,
  messages,
  stream: <span class="k">true</span>,
  <span class="p">gantry</span>: { feature: <span class="s">'chat-support'</span> },
});

<span class="k">for</span> <span class="k">await</span> (<span class="k">const</span> chunk <span class="k">of</span> stream) {
  process.stdout.<span class="fn">write</span>(chunk.choices[<span class="v">0</span>]?.delta?.content ?? <span class="s">''</span>);
}`;

const TABS = [
  { id: 'openai',    label: 'openai',    file: 'trace.ts',  snippet: OPENAI_SNIPPET    },
  { id: 'anthropic', label: 'anthropic', file: 'trace.ts',  snippet: ANTHROPIC_SNIPPET },
  { id: 'stream',    label: 'streaming', file: 'stream.ts', snippet: STREAM_SNIPPET    },
];

export default function IntegrateCodeEditor() {
  const [active, setActive] = useState('openai');
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div className="lp-editor">
      {/* bar */}
      <div className="lp-editor-bar" style={{ gap: 0, padding: 0, background: 'var(--bg-1)' }}>
        {/* tabs */}
        <div style={{ display: 'flex', flex: 1 }}>
          {TABS.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  padding: '10px 16px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 12,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? 'var(--text-0)' : 'var(--text-3)',
                  background: isActive ? 'var(--bg-inset)' : 'transparent',
                  border: 'none',
                  borderRight: '1px solid var(--hair)',
                  borderBottom: isActive ? '1px solid var(--bg-inset)' : '1px solid var(--hair)',
                  cursor: 'pointer',
                  transition: 'color 150ms, background 150ms',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 1,
                    background: 'var(--accent)',
                  }} />
                )}
                {t.label}
              </button>
            );
          })}
        </div>
        {/* filename */}
        <span style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: 11, color: 'var(--text-3)',
          padding: '0 14px',
          borderBottom: '1px solid var(--hair)',
          display: 'flex', alignItems: 'center',
        }}>{tab.file}</span>
      </div>

      {/* code */}
      <pre
        className="lp-code"
        dangerouslySetInnerHTML={{ __html: `<code>${tab.snippet}</code>` }}
      />

      {/* output bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 20px',
        borderTop: '1px solid var(--hair)',
        background: 'var(--bg-1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11, fontWeight: 600,
            color: 'var(--accent)',
          }}>
            <svg width="9" height="9" viewBox="0 0 9 9">
              <circle cx="4.5" cy="4.5" r="4.5" fill="var(--accent)" opacity="0.2" />
              <circle cx="4.5" cy="4.5" r="2.5" fill="var(--accent)" />
            </svg>
            200 OK
          </span>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11, color: 'var(--text-3)',
          }}>
            event_id evt_9f2a1c
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11, color: 'var(--text-2)',
          }}>summarization</span>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: 11, color: 'var(--accent)', fontWeight: 600,
          }}>$0.019</span>
        </div>
      </div>
    </div>
  );
}
