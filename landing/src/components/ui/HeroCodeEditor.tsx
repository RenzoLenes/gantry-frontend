'use client';
import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

const TS_SNIPPET = `<span class="c">// wrap your existing client — one line</span>
<span class="k">import</span> { <span class="fn">Gantry</span> } <span class="k">from</span> <span class="s">'@gantry/sdk'</span>;
<span class="k">import</span> <span class="fn">OpenAI</span> <span class="k">from</span> <span class="s">'openai'</span>;

<span class="k">const</span> gantry = <span class="k">new</span> <span class="fn">Gantry</span>({ dsn: <span class="s">'gy_live_8f2c…c89b'</span> });

<span class="c">// every call is now traced — cost, tokens, latency</span>
<span class="k">const</span> openai = gantry.<span class="fn">wrap</span>(<span class="k">new</span> <span class="fn">OpenAI</span>());

<span class="k">await</span> openai.chat.completions.<span class="fn">create</span>({
  model: <span class="s">'gpt-4o'</span>,
  messages,
  <span class="p">gantry</span>: { feature: <span class="s">'summarization'</span> },
});`;

const PY_SNIPPET = `<span class="c"># wrap your existing client — one line</span>
<span class="k">from</span> gantry <span class="k">import</span> Gantry
<span class="k">from</span> openai <span class="k">import</span> OpenAI

gantry = <span class="fn">Gantry</span>(dsn=<span class="s">'gy_live_8f2c…c89b'</span>)

<span class="c"># every call is now traced — cost, tokens, latency</span>
openai = gantry.<span class="fn">wrap</span>(<span class="fn">OpenAI</span>())

openai.chat.completions.<span class="fn">create</span>(
  model=<span class="s">'gpt-4o'</span>,
  messages=messages,
  <span class="p">gantry</span>={<span class="s">'feature'</span>: <span class="s">'summarization'</span>},
)`;

const TABS = [
  { id: 'ts', label: 'TypeScript', file: 'app/llm.ts', snippet: TS_SNIPPET },
  { id: 'py', label: 'Python',     file: 'app/llm.py', snippet: PY_SNIPPET },
];

export default function HeroCodeEditor() {
  const [active, setActive] = useState('ts');
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div className="lp-editor">
      <div className="lp-editor-bar">
        <div className="lp-tabs2">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`lp-tab2${active === t.id ? ' active' : ''}`}
              onClick={() => setActive(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <span className="lp-editor-file">{tab.file}</span>
      </div>
      <pre
        className="lp-code"
        dangerouslySetInnerHTML={{ __html: `<code>${tab.snippet}</code>` }}
      />
      <div className="lp-code-out">
        <span className="ok">● traced</span>
        <span className="meta">summarization · gpt-4o · 1,284 tok · $0.019 · 912ms</span>
      </div>
    </div>
  );
}
