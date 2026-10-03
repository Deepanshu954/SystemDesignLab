import { notFound } from 'next/navigation';
import { Clock, ShieldCheck, ArrowLeft, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableOfContents from '@/components/layout/TableOfContents';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import JsonLd from '@/components/seo/JsonLd';
import { api } from '@/lib/api';

interface ConceptPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const concepts = await api.getConcepts();
  return concepts.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: ConceptPageProps) {
  const concept = await api.getConceptBySlug(params.slug);
  if (!concept) {
    return { title: 'Concept Not Found' };
  }
  return {
    title: `${concept.title} — System Design Fundamentals`,
    description: concept.summary,
    openGraph: {
      title: concept.title,
      description: concept.summary,
      type: 'article',
    },
  };
}

export default async function ConceptDetailPage({ params }: ConceptPageProps) {
  const concept = await api.getConceptBySlug(params.slug);

  if (!concept) {
    notFound();
  }

  // Parse key takeaways
  let takeaways: string[] = [];
  if (concept.keyTakeawaysJson) {
    try {
      takeaways = JSON.parse(concept.keyTakeawaysJson);
    } catch {
      // ignore
    }
  }

  // Extract headings for Table of Contents
  const headingMatches = concept.fullContentMarkdown.match(/^(##|###)\s+(.+)$/gm) || [];
  const tocItems = headingMatches.map((h) => {
    const isH3 = h.startsWith('###');
    const text = h.replace(/^(##|###)\s+/, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { id, text, level: isH3 ? 3 : 2 };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd
        type="TechArticle"
        data={{
          headline: concept.title,
          description: concept.summary,
          articleSection: concept.category,
          datePublished: concept.createdAt,
          dateModified: concept.updatedAt,
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Fundamentals', href: '/fundamentals' },
          { label: concept.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6">
        {/* Main Guide Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="pb-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                {concept.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {concept.difficulty}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {concept.readingTimeMinutes} min read
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {concept.title}
            </h1>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              {concept.summary}
            </p>
          </div>

          {/* Key Takeaways Box */}
          {takeaways.length > 0 && (
            <div className="my-8 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4" /> Core Architectural Takeaways
              </h3>
              <ul className="space-y-2.5">
                {takeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Markdown Content */}
          <MarkdownRenderer content={concept.fullContentMarkdown} />

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/fundamentals"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Fundamentals
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Apply in Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <TableOfContents items={tocItems} />

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Need Back-of-the-Envelope Math?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Use our automated capacity calculator to model QPS, memory, and bandwidth.
              </p>
              <Link
                href="/tools/capacity-calculator"
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                Launch Calculator →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
