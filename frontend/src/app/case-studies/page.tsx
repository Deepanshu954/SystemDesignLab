'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, Clock, BarChart3, Layers, Filter } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { api } from '@/lib/api';
import { CaseStudySummary } from '@/types';

const CATEGORIES = [
  { id: 'ALL', label: 'All Architectures' },
  { id: 'HIGH_THROUGHPUT', label: 'High Throughput' },
  { id: 'REAL_TIME', label: 'Real-Time' },
  { id: 'DISTRIBUTED_STORAGE', label: 'Storage & DBs' },
  { id: 'FINANCIAL', label: 'Financial' },
];

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudySummary[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await api.getCaseStudies();
      setCaseStudies(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = caseStudies.filter((study) => {
    const matchesCategory = category === 'ALL' || study.category === category;
    const matchesSearch =
      study.title.toLowerCase().includes(search.toLowerCase()) ||
      study.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'BEGINNER':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'INTERMEDIATE':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'ADVANCED':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Case Studies' }]} />

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          Production Engineering Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Flagship System Design Case Studies
        </h1>
        <p className="mt-2 text-lg text-slate-400 max-w-3xl">
          Complete, end-to-end architectures modeled with real capacity math, component diagrams, failure mode analyses, and production trade-offs. No hand-waving.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-white">24 Steps</div>
          <div className="text-xs text-slate-400 mt-1">Rigorous architectural blueprint format</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-blue-400">100% Quantitative</div>
          <div className="text-xs text-slate-400 mt-1">DAU, QPS, RAM, Bandwidth & Storage math</div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="text-2xl font-bold text-emerald-400">Failure Modes</div>
          <div className="text-xs text-slate-400 mt-1">Single point of failures & mitigation strategies</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by system name, keywords, or patterns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                category === cat.id
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Case Studies Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading production case studies...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
          <p className="text-slate-400 text-base">No case studies match your query.</p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('ALL');
            }}
            className="mt-3 text-sm text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(
                      study.difficulty
                    )}`}
                  >
                    {study.difficulty}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {study.readingTimeMinutes} min read
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                      {study.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {study.title}
                </h2>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {study.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  24-Step Blueprint
                </span>
                <span className="text-sm font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Architecture <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
