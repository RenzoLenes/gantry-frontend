'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '#product',  label: 'Product'       },
  { href: '#integrate',label: 'Integrate'      },
  { href: '#advisor',  label: 'Model Advisor'  },
  { href: '#',         label: 'Docs'           },
  { href: '#',         label: 'Pricing'        },
];

export default function MobileNavToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && close());
    return () => document.removeEventListener('keydown', close);
  }, [open]);

  return (
    <>
      <button
        className="lp-hamburger"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`lp-ham-line${open ? ' open' : ''}`} />
        <span className={`lp-ham-line${open ? ' open' : ''}`} />
        <span className={`lp-ham-line${open ? ' open' : ''}`} />
      </button>

      {open && (
        <div className="lp-mobile-menu" role="navigation" aria-label="Mobile navigation">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
