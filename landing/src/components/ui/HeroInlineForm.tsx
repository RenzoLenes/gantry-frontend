'use client';

import { useState, useEffect, useCallback } from 'react';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function HeroInlineForm() {
  const [email, setEmail]     = useState('');
  const [state, setState]     = useState<State>('idle');
  const [spots, setSpots]     = useState<number | null>(null);
  const [priority, setPriority] = useState<number | null>(null);

  const fetchSpots = useCallback(async () => {
    try {
      const res = await fetch('/api/waitlist');
      if (!res.ok) return;
      const data = await res.json();
      if (typeof data.spotsLeft === 'number') setSpots(data.spotsLeft);
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchSpots();
    const id = setInterval(fetchSpots, 30_000);
    return () => clearInterval(id);
  }, [fetchSpots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || state === 'loading') return;

    setState('loading');
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), ref }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPriority(data.position ?? null);
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'var(--accent-soft)', border: '1px solid var(--accent-line)',
          borderRadius: 'var(--r-2)', padding: '12px 18px',
          width: 'fit-content',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span style={{ fontSize: 14, color: 'var(--text-0)', fontWeight: 500 }}>
            You&apos;re in
            {priority ? <> — spot <span style={{ color: 'var(--accent)', fontWeight: 700 }}>#{priority}</span> of 500</> : ''}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-3)', margin: 0 }}>
          We&apos;ll reach out before launch. No spam.
        </p>
      </div>
    );
  }

  return (
    <div id="waitlist" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          display: 'flex', gap: 8, flexWrap: 'wrap',
        }}
      >
        <input
          type="email"
          placeholder="your@work-email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={state === 'loading'}
          autoComplete="email"
          style={{
            flex: '1 1 220px',
            background: 'var(--bg-1)',
            border: state === 'error'
              ? '1px solid var(--error)'
              : '1px solid var(--border-strong)',
            borderRadius: 'var(--r-2)',
            color: 'var(--text-0)',
            fontFamily: 'var(--font-sans, sans-serif)',
            fontSize: 14, padding: '0 14px', height: 44,
            outline: 'none', transition: 'border-color 180ms, box-shadow 180ms',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--border-focus)';
            e.target.style.boxShadow   = '0 0 0 3px rgba(0,229,153,0.10)';
          }}
          onBlur={e => {
            e.target.style.borderColor = state === 'error' ? 'var(--error)' : 'var(--border-strong)';
            e.target.style.boxShadow   = 'none';
          }}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn btn-primary"
          style={{ height: 44, fontSize: 14, paddingLeft: 20, paddingRight: 20, flexShrink: 0 }}
        >
          {state === 'loading' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              style={{ animation: 'spin 0.8s linear infinite' }}>
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : 'Get early access →'}
        </button>
      </form>

      {state === 'error' && (
        <p style={{ fontSize: 12, color: 'var(--error)', margin: 0 }}>
          Something went wrong — try again.
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-3)' }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 5px rgba(0,229,153,0.6)',
            display: 'inline-block',
          }} />
          {spots === null
            ? 'Limited spots remaining'
            : <><span style={{ color: 'var(--accent)', fontWeight: 600 }}>{spots}</span> of 500 spots left</>
          }
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>No spam. Ever.</span>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
