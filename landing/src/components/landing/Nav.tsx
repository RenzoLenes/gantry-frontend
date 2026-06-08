'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const onScroll = React.useCallback(() => {
    setScrolled(window.scrollY > threshold);
  }, [threshold]);
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);
  React.useEffect(() => { onScroll(); }, [onScroll]);
  return scrolled;
}

export default function Nav() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-200',
        scrolled && 'border-border bg-background/90 backdrop-blur-lg',
      )}
    >
      <nav className="mx-auto flex h-[60px] w-full max-w-6xl items-center justify-between px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0 rounded-md hover:opacity-80 transition-opacity">
          <Image
            src="/gantry-logo-horizontal-light.svg"
            alt="Gantry"
            width={110}
            height={36}
            priority
          />
        </Link>

        {/* Right: single CTA → scrolls to hero form */}
        <Button size="sm" asChild>
          <a href="#waitlist">Join Waitlist</a>
        </Button>
      </nav>
    </header>
  );
}
