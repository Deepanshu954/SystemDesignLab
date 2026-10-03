'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Search, CheckCircle, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { api } from '@/lib/api';
import { InterviewQuestion } from '@/types';

export default function InterviewPrepPage() {
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await api.getInterviewQuestions();
      setQuestions(data);
      if (data.length > 0) {
        setExpandedId(data[0].id); // Expand first by default
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filtered = questions.filter((q) => {
    return (
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.questionText.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Interview Preparation' }]} />

      {/* Hero Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          Technical Interview Readiness
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Design Interview Questions & Solutions
        </h1>
        <p className="mt-2 text-lg text-slate-400 max-w-3xl">
          Battle-tested system design interview questions asked at Tier-1 tech companies. Master trade-off articulation, concurrency safeguards, and edge-case handling.
        </p>
      </div>

      {/* Featured Banner: Beginners Guide */}
      <div className="mb-10 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/40 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Recommended First Step
          </span>
          <h2 className="text-2xl font-bold text-white">
            System Design Interview Guide for Beginners
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            New to system design? Master the proven 45-minute interview framework, pacing strategy, non-functional requirements formula, and the 5 common traps to avoid.
          </p>
        </div>
        <Link
          href="/interview-prep/beginners"
          className="shrink-0 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
        >
          Read Beginner Blueprint <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 45-Minute Interview Breakdown Cheat Sheet */}
      <div className="mb-12 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          The 45-Minute System Design Interview Cadence
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
            <div className="text-xs font-mono text-blue-400 font-semibold">00 - 05 Mins</div>
            <div className="font-bold text-white text-sm mt-1">Scope & Requirements</div>
            <div className="text-xs text-slate-400 mt-1">Functional vs Non-functional, DAU, SLAs, out-of-scope boundaries.</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
            <div className="text-xs font-mono text-purple-400 font-semibold">05 - 12 Mins</div>
            <div className="font-bold text-white text-sm mt-1">Capacity Estimation</div>
            <div className="text-xs text-slate-400 mt-1">QPS (peak & avg), storage growth, network bandwidth, memory cache.</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
            <div className="text-xs font-mono text-amber-400 font-semibold">12 - 25 Mins</div>
            <div className="font-bold text-white text-sm mt-1">High-Level Design</div>
            <div className="text-xs text-slate-400 mt-1">API endpoints, data schemas, component topology, read/write flows.</div>
          </div>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50">
            <div className="text-xs font-mono text-emerald-400 font-semibold">25 - 45 Mins</div>
            <div className="font-bold text-white text-sm mt-1">Deep Dive & Trade-offs</div>
            <div className="text-xs text-slate-400 mt-1">Bottlenecks, sharding, replication lag, SPOF failover, cache stampedes.</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Filter interview questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Questions Accordion */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading interview questions...</div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 text-slate-400">
          No questions matched your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            let keyPoints: string[] = [];
            if (item.keyPointsJson) {
              try {
                keyPoints = JSON.parse(item.keyPointsJson);
              } catch {
                // ignore
              }
            }

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                        {item.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/30 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Question Prompt
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">{item.questionText}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                        Architectural Solution & Talking Points
                      </h4>
                      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-sm text-slate-200 leading-relaxed font-sans">
                        {item.answerGuide}
                      </div>
                    </div>

                    {keyPoints.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                          Must-Mention Architectural Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {keyPoints.map((pt, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-xs text-blue-300 border border-slate-700/60"
                            >
                              <CheckCircle className="w-3 h-3 text-emerald-400" />
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
