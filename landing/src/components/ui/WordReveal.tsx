'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function WordReveal({ children, delay = 0, className, style }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...style,
        display: style?.display ?? 'inline-block',
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0)' : 'blur(10px)',
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition:
          'opacity 0.65s cubic-bezier(0.22,0.61,0.36,1), filter 0.65s cubic-bezier(0.22,0.61,0.36,1), transform 0.65s cubic-bezier(0.22,0.61,0.36,1)',
      }}
    >
      {children}
    </span>
  );
}
