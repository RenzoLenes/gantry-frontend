'use client';

import { useState, useEffect, useCallback } from 'react';
import CopyButton from '@/components/ui/CopyButton';

type FormState = 'idle' | 'loading' | 'success' | 'error';
type SpendBracket = 'under_500' | '500_5k' | '5k_50k' | '50k_plus' | '';

interface WaitlistResponse {
  position: number;
  referral_link: string;
  referral_count: number;
  already_joined?: boolean;
}

interface WaitlistFormProps {
  /** Anchor id for the form (the hero uses "waitlist" so nav/CTA buttons scroll here). */
  id?: string;
}

const SPEND_OPTIONS: { value: Exclude<SpendBracket, ''>; label: string }[] = [
  { value: 'under_500', label: 'Under $500' },
  { value: '500_5k',    label: '$500–$5k'   },
  { value: '5k_50k',    label: '$5k–$50k'   },
  { value: '50k_plus',  label: '$50k+'      },
];

export default function WaitlistForm({ id }: WaitlistFormProps) {
  const [email, setEmail]               = useState('');
  const [spendBracket, setSpendBracket] = useState<SpendBracket>('');
  const [formState, setFormState]       = useState<FormState>('idle');
  const [errorMsg, setErrorMsg]         = useState('');
  const [spotsLeft, setSpotsLeft]       = useState<number | null>(null);
  const [successData, setSuccessData]   = useState<WaitlistResponse | null>(null);
  const [ref, setRef]                   = useState<string | null>(null);
  const [view, setView]                 = useState<'join' | 'check'>('join');

  // Capture the referrer's code from the URL (?ref=CODE) so we credit them.
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('ref');
    if (code) setRef(code);
  }, []);

  const fetchSpots = useCallback(async () => {
    try {
      const res = await fetch('/api/waitlist');
      if (!res.ok) return;
      const data = await res.json();
      if (typeof data.spotsLeft === 'number') setSpotsLeft(data.spotsLeft);
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchSpots();
    const id = setInterval(fetchSpots, 30_000);
    return () => clearInterval(id);
  }, [fetchSpots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || formState === 'loading') return;

    if (!spendBracket) {
      setErrorMsg('Select your monthly LLM spend.');
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), spendBracket, ref }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error((data as { error?: string })?.error || 'Something went wrong.');
      }

      setSuccessData(data as WaitlistResponse);
      setFormState('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setFormState('error');
    }
  };

  // Look up an existing spot without registering (growth-loop: come back, see if you climbed).
  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || formState === 'loading') return;

    setFormState('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`/api/waitlist?email=${encodeURIComponent(email.trim())}`);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error((data as { error?: string })?.error || 'Something went wrong.');

      if (!data.found) {
        setErrorMsg("That email isn't on the list yet — join above.");
        setFormState('error');
        return;
      }

      setSuccessData({ ...(data as WaitlistResponse), already_joined: true });
      setFormState('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setFormState('error');
    }
  };

  /* ── Post-submit state ── */
  if (formState === 'success' && successData) {
    return (
      <div id={id} className="wl-success">
        <p className="wl-success-headline">
          {successData.already_joined ? "You're already on the list." : "You're on the list."}
        </p>
        <p className="wl-success-sub">
          You&apos;re <span className="wl-accent">#{successData.position}</span> of 500. We&apos;ll email you the
          moment Gantry is live — you&apos;ll be among the first in.
        </p>

        <div className="wl-divider" />

        <p className="wl-share-heading">Want in sooner? Bring your team.</p>
        <p className="wl-share-sub">
          Share your link — every engineer who joins with it moves you up the queue.
        </p>
        <div className="wl-referral">
          <span className="wl-referral-link">{successData.referral_link}</span>
          <CopyButton text={successData.referral_link} />
        </div>
      </div>
    );
  }

  /* ── Form ── */
  const loading = formState === 'loading';

  return (
    <div id={id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {view === 'check' ? (
        <form onSubmit={handleCheck} noValidate className="wl-inline">
          <input
            type="email"
            className="wl-input"
            placeholder="your@work-email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            autoComplete="email"
            aria-label="Work email"
          />
          <button type="submit" disabled={loading} className="btn btn-primary wl-submit">
            {loading ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : 'Check my position →'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="wl-inline">
          <input
            type="email"
            className="wl-input"
            placeholder="your@work-email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            disabled={loading}
            autoComplete="email"
            aria-label="Work email"
          />

          <div className="wl-select-wrap">
            <select
              className="wl-select"
              value={spendBracket}
              onChange={e => setSpendBracket(e.target.value as SpendBracket)}
              required
              disabled={loading}
              data-empty={spendBracket === '' ? 'true' : 'false'}
              aria-label="Monthly LLM spend"
            >
              <option value="" disabled>LLM spend / month</option>
              {SPEND_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <svg className="wl-select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          <button type="submit" disabled={loading} className="btn btn-primary wl-submit">
            {loading ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : 'Get early access →'}
          </button>
        </form>
      )}

      {formState === 'error' && <p className="wl-error">{errorMsg}</p>}

      {view === 'join' ? (
        <p className="wl-counter">
          <span className="wl-counter-pip" />
          {spotsLeft === null
            ? 'Limited early-access spots remaining'
            : <span><span className="wl-accent" style={{ fontWeight: 600 }}>{spotsLeft}</span> of 500 early-access spots left</span>
          }
        </p>
      ) : null}

      {view === 'join' ? (
        <>
          <p className="wl-fine-print">No spam. No credit card. We email you once — when it&apos;s live.</p>
          <button
            type="button"
            className="wl-check-link"
            onClick={() => { setView('check'); setFormState('idle'); setErrorMsg(''); }}
          >
            Already on the list? Check your position →
          </button>
        </>
      ) : (
        <button
          type="button"
          className="wl-check-link"
          onClick={() => { setView('join'); setFormState('idle'); setErrorMsg(''); }}
        >
          ← Back to sign up
        </button>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
