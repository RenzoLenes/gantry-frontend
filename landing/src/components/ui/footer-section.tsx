'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { XIcon, MailIcon } from 'lucide-react';

/* ── Brand icons not in this lucide version ── */
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Legal',
    links: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    label: 'Social Links',
    links: [
      { title: 'Twitter / X', href: 'https://twitter.com/gantrydev', icon: XIcon, external: true },
      { title: 'LinkedIn', href: 'https://www.linkedin.com/company/gantrydev', icon: LinkedinIcon, external: true },
      { title: 'Email', href: 'mailto:hello@gantry.dev', icon: MailIcon },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative w-full flex flex-col items-center justify-center rounded-t-[2rem] md:rounded-t-[3rem] px-6 py-12 lg:py-16"
      style={{
        borderTop: '1px solid var(--hair)',
        borderLeft: '1px solid var(--hair)',
        borderRight: '1px solid var(--hair)',
        background: 'radial-gradient(35% 128px at 50% 0%, rgba(255,255,255,0.07), transparent), var(--bg-1)',
      }}
    >
      {/* glow line at top center */}
      <div
        className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-px rounded-full"
        style={{ background: 'rgba(255,255,255,0.18)', filter: 'blur(2px)' }}
      />

      <div className="grid w-full max-w-[1200px] gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <Image src="/gantry-logo-horizontal-light.svg" alt="Gantry" width={115} height={37} />
          <p className="mt-8 text-sm md:mt-0" style={{ color: 'var(--text-3)' }}>
            © {new Date().getFullYear()} Gantry, Inc. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-10 flex flex-wrap gap-x-16 gap-y-8 xl:col-span-2 xl:mt-0 xl:justify-end">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 min-w-[120px] md:mb-0">
                <h3 className="text-xs" style={{ color: 'var(--text-0)' }}>{section.label}</h3>
                <ul className="mt-4 space-y-2 text-sm" style={{ color: 'var(--text-2)' }}>
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center transition-all duration-300"
                        style={{ color: 'var(--text-2)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-0)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
