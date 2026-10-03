import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: {
    default: 'System Design Lab — High-Level Design, Case Studies & Capacity Estimation',
    template: '%s | System Design Lab',
  },
  description:
    'An authoritative system design knowledge hub for BTech students and backend software engineers. 24-step flagship case studies, interactive capacity estimation, and interview blueprints.',
  keywords: [
    'system design',
    'system design interview',
    'high level design',
    'low level design',
    'capacity estimation',
    'url shortener system design',
    'rate limiter system design',
    'distributed systems',
    'backend architecture',
  ],
  authors: [{ name: 'System Design Lab Team' }],
  creator: 'System Design Lab Team',
  metadataBase: new URL('https://systemdesignlab.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://systemdesignlab.dev',
    title: 'System Design Lab — Practical System Design & Backend Engineering Hub',
    description:
      'Learn production-grade system design concepts, explore 24-step flagship case studies, and calculate capacity math with interactive tools.',
    siteName: 'System Design Lab',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'System Design Lab — Practical System Design & Backend Engineering Hub',
    description:
      'Production-grade system design concepts, 24-step case studies, and interactive capacity estimation.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'System Design Lab',
    url: 'https://systemdesignlab.dev',
    logo: 'https://systemdesignlab.dev/logo.png',
    sameAs: ['https://github.com/deepanshu954/SystemDesignLab'],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        <JsonLd data={organizationSchema} />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
