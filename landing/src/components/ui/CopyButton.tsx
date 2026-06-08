'use client';
import { useState } from 'react';

const COPY_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5a2 2 0 0 1 2-2h10" />
  </svg>
);

const CHECK_ICON = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00E599" strokeWidth="2.4">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <button className="lp-copy" onClick={handleClick} aria-label="Copy to clipboard">
      {copied ? CHECK_ICON : COPY_ICON}
    </button>
  );
}
