'use client';

import { useEffect, useState } from 'react';

const BASE = 42_847_193;
const RPS   = 11_200; // tokens per second simulation

export default function LiveTicker() {
  const [tokens, setTokens] = useState(BASE);
  const [ms, setMs]         = useState(0.3);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let t = BASE;
    const iv = setInterval(() => {
      const delta = Math.floor(RPS / 10 + Math.random() * 400);
      t += delta;
      setTokens(t);
      setMs(+(0.1 + Math.random() * 0.6).toFixed(1));
    }, 100);

    return () => clearInterval(iv);
  }, []);

  return (
    <span className="lp-ticker-row">
      <span className="lp-ticker-val">{tokens.toLocaleString('en-US')}</span>
      <span className="lp-ticker-unit"> tok/hr</span>
      <span className="lp-ticker-sep">·</span>
      <span className="lp-ticker-ago">last event <span className="lp-ticker-val">{ms}s</span> ago</span>
    </span>
  );
}
