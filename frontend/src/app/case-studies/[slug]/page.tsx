import { notFound } from 'next/navigation';
import { Clock, ShieldCheck, Database, Cpu, HardDrive, ArrowLeft, Bookmark as BookmarkIcon, Share2 } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import TableOfContents from '@/components/layout/TableOfContents';
import MarkdownRenderer from '@/components/content/MarkdownRenderer';
import ArchitectureDiagram from '@/components/content/ArchitectureDiagram';
import JsonLd from '@/components/seo/JsonLd';
import { api } from '@/lib/api';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const caseStudies = await api.getCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const study = await api.getCaseStudyBySlug(params.slug);
  if (!study) {
    return { title: 'Case Study Not Found' };
  }
  return {
    title: `${study.title} — System Design Architecture`,
    description: study.summary,
    openGraph: {
      title: study.title,
      description: study.summary,
      type: 'article',
    },
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const study = await api.getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  // Parse capacity math if present
  let capacityMath = null;
  if (study.capacityMathJson) {
    try {
      capacityMath = JSON.parse(study.capacityMathJson);
    } catch {
      // ignore
    }
  }

  // Extract headings for Table of Contents
  const headingMatches = study.fullContentMarkdown.match(/^(##|###)\s+(.+)$/gm) || [];
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
          headline: study.title,
          description: study.summary,
          articleSection: study.category,
          datePublished: study.createdAt,
          dateModified: study.updatedAt,
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Case Studies', href: '/case-studies' },
          { label: study.title },
        ]}
      />

      {/* Main Grid: Content + Sidebar TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-6">
        {/* Article Body */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="pb-8 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                {study.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {study.difficulty}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {study.readingTimeMinutes} min read
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {study.title}
            </h1>
            <p className="mt-4 text-lg text-slate-400 leading-relaxed">
              {study.summary}
            </p>
          </div>

          {/* Worked Capacity Math Dashboard Card */}
          {capacityMath && (
            <div className="my-8 rounded-2xl border border-blue-500/30 bg-blue-950/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Worked Capacity & Sizing Math
                </h3>
                <span className="text-xs font-mono text-slate-400">Production Baseline</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Daily Active Users</div>
                  <div className="text-lg font-bold font-mono text-white mt-1">
                    {(capacityMath.dau || 0).toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Peak QPS</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                    {(capacityMath.peakReadQps || capacityMath.peakWriteQps || 0).toLocaleString()} req/s
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">5-Yr Datastore</div>
                  <div className="text-lg font-bold font-mono text-purple-400 mt-1">
                    {capacityMath.storagePerYearTb ? `${(capacityMath.storagePerYearTb * 5).toFixed(1)} TB` : 'Multi-TB'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-xs text-slate-400">Redis RAM Cache</div>
                  <div className="text-lg font-bold font-mono text-blue-400 mt-1">
                    {capacityMath.ramCacheGb ? `${capacityMath.ramCacheGb} GB` : 'Distributed'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visual Architecture Topology */}
          <ArchitectureDiagram
            diagramJson={study.architectureDiagramJson}
            title={`${study.title} — System Topology`}
          />

          {/* Full 24-Step Markdown Content */}
          <MarkdownRenderer content={study.fullContentMarkdown} />

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>
            <Link
              href="/tools/capacity-calculator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors"
            >
              Recalculate with Custom Scale
            </Link>
          </div>
        </div>

        {/* Sticky Sidebar: Table of Contents & Quick Actions */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <TableOfContents items={tocItems} />

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Key Takeaways
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sub-10ms p99 latency target with multi-tier Redis caching</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero collision generation via centralized KGS or Snowflake IDs</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Resilient failover with active-passive read replica clusters</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
