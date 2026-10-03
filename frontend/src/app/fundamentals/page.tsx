'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Search, ArrowRight, Clock, ShieldCheck, Cpu, Database, Network } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { api } from '@/lib/api';
import { ConceptSummary } from '@/types';

const CATEGORIES = [
  { id: 'ALL', label: 'All Fundamentals' },
  { id: 'FUNDAMENTALS', label: 'Core Fundamentals' },
  { id: 'CACHING', label: 'Caching' },
  { id: 'SCALING', label: 'Scaling & Load Balancing' },
  { id: 'DATABASES', label: 'Databases & Storage' },
];

export default function FundamentalsPage() {
  const [concepts, setConcepts] = useState<ConceptSummary[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await api.getConcepts();
      setConcepts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filtered = concepts.filter((c) => {
    const matchesCategory = category === 'ALL' || c.category === category;
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'CACHING':
        return Cpu;
      case 'DATABASES':
        return Database;
      case 'SCALING':
        return Network;
      default:
        return Layers;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'System Design Fundamentals' }]} />

      {/* Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          Core Foundations
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Design Fundamentals
        </h1>
        <p className="mt-2 text-lg text-slate-400 max-w-3xl">
          The essential building blocks of distributed architecture: caching topologies, database scaling patterns, consistent hashing, and capacity estimation formulas.
        </p>
      </div>

      {/* Search & Category Pills */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search concepts (e.g. sharding, cache stampede, consistent hashing)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                category === cat.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">Loading fundamental concepts...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-slate-800 bg-slate-900/40">
          <p className="text-slate-400 text-base">No concepts matched your search.</p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('ALL');
            }}
            className="mt-3 text-sm text-indigo-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((concept) => {
            const Icon = getCategoryIcon(concept.category);
            return (
              <Link
                key={concept.id}
                href={`/fundamentals/${concept.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-7 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {concept.readingTimeMinutes} min read
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                        {concept.category}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {concept.title}
                  </h2>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {concept.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    Deep Architectural Guide
                  </span>
                  <span className="text-sm font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
