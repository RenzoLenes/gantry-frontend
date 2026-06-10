import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gantry — Invisible infrastructure for AI',
  description:
    'Ship LLM features. See every token and dollar, instantly. Real-time cost, token, and latency observability for production LLMs.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
