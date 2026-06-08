'use client';

import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';

const faqs = [
  {
    q: 'When does Gantry launch?',
    a: "We're in active development. Waitlist members get notified before anyone else, and early access spots are limited.",
  },
  {
    q: 'Which LLM providers will you support?',
    a: "OpenAI, Anthropic, Google, Mistral, any provider with a Python or JavaScript client. If you're using a provider not on this list, tell us when you join.",
  },
  {
    q: "Does my LLM traffic route through Gantry's servers?",
    a: "No. Gantry wraps your client locally. Only metrics and metadata leave your infrastructure, your prompts and completions never touch our servers.",
  },
  {
    q: 'How much will Gantry cost?',
    a: 'Free tier at launch. Pricing will scale with usage. Waitlist members hear pricing details first.',
  },
];

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`faq-card${open ? ' faq-card--open' : ''}`}
      onMouseMove={onMove}
    >
      <button
        className="faq-card-trigger"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="faq-card-q">{q}</span>
        <ChevronDown className="faq-card-chevron" aria-hidden="true" />
      </button>
      <div
        className="faq-card-body"
        style={{
          maxHeight: open ? '300px' : '0',
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.22,0.61,0.36,1), opacity 0.3s ease',
        }}
      >
        <p className="faq-card-a">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="lp-sec">
      <div className="lp-wrap">
        <ScrollReveal>
          <h2 className="lp-h2">Questions.</h2>
        </ScrollReveal>

        <div className="faq-cards">
          {faqs.map((item, i) => (
            <ScrollReveal key={i} style={{ transitionDelay: `${i * 60}ms` } as React.CSSProperties}>
              <FAQItem {...item} defaultOpen={i === 0} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
