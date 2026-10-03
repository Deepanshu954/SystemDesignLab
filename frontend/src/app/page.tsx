import React from 'react';
import Link from 'next/link';
import {
  Layers,
  Cpu,
  Calculator,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Server,
  Zap,
  Database,
  Lock,
} from 'lucide-react';
import { api } from '@/lib/api';

export default async function HomePage() {
  const caseStudies = await api.getCaseStudies();

  return (
    <div className="flex flex-col items-center">
      {/* 1. Hero Section */}
      <section className="w-full relative overflow-hidden py-20 lg:py-28 border-b border-slate-850">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Structured 24-Step Production Blueprints for Engineers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight">
            Master <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">System Design</span> & Backend Engineering
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The definitive technical knowledge hub for BTech placement candidates and early-career software engineers. 
            Original case studies, real back-of-the-envelope math, and runnable backend APIs.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/case-studies"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Flagship Studies</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <Link
              href="/tools/capacity-calculator"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-sm transition-all"
            >
              <Calculator className="w-4 h-4 text-cyan-400" />
              <span>Interactive Sizing Calculator</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">24-Step Format</div>
                <div className="text-xs text-slate-400">Standardized case studies</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">Real Capacity Math</div>
                <div className="text-xs text-slate-400">QPS, storage, bandwidth</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">Live REST API</div>
                <div className="text-xs text-slate-400">Spring Boot 3.3.x backend</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="font-bold text-white text-sm">100% Free & Open</div>
                <div className="text-xs text-slate-400">Zero paywalls or ads</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Flagship Case Studies Showcase */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Flagship Blueprints</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Production System Design Studies</h2>
          </div>
          <Link
            href="/case-studies"
            className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium"
          >
            <span>View all studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="p-6 rounded-2xl glass-panel hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    study.difficulty === 'BEGINNER'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : study.difficulty === 'INTERMEDIATE'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {study.difficulty}
                  </span>
                  <span className="text-xs text-slate-400">{study.readingTimeMinutes} min read</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
                  {study.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {study.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-cyan-400 font-medium">Explore 24-Step Breakdown →</span>
                <span className="text-slate-500 uppercase">{study.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Core Knowledge Pillars Grid */}
      <section className="w-full bg-slate-950/70 border-y border-slate-850 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Comprehensive Engineering Pillars</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400">
              From back-of-the-envelope capacity estimations to distributed concurrency trade-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Fundamentals & Trade-offs</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Clear comparisons between HLD vs LLD, CAP theorem proofs, caching patterns (cache-aside, write-through), and consistent hashing with virtual nodes.
              </p>
              <Link href="/fundamentals" className="inline-flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:underline">
                Explore Fundamentals →
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Capacity Math Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Interactive estimation calculator computing QPS, Peak QPS, Daily and 5-Year storage, network bandwidth, and Pareto 80/20 RAM cache sizing.
              </p>
              <Link href="/tools/capacity-calculator" className="inline-flex items-center gap-1 text-xs text-indigo-400 font-semibold hover:underline">
                Open Sizing Tool →
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Interview Blueprints</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                45-minute system design interview pacing templates, common trap avoidance strategies, and rubric-driven answers for placement rounds.
              </p>
              <Link href="/interview-prep/beginners" className="inline-flex items-center gap-1 text-xs text-sky-400 font-semibold hover:underline">
                View Roadmap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latency Numbers Every Engineer Should Know */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="p-8 rounded-2xl glass-panel border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Cheat Sheet</div>
              <h3 className="text-xl font-bold text-white mt-1">Latency Numbers Every Systems Engineer Must Know</h3>
            </div>
            <Link
              href="/fundamentals/capacity-estimation"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              See complete back-of-the-envelope formulas →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900/60 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Operation</th>
                  <th className="px-4 py-3">Latency</th>
                  <th className="px-4 py-3">Human Scale Comparison</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr>
                  <td className="px-4 py-3 font-medium text-white">L1 Cache Reference</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">0.5 ns</td>
                  <td className="px-4 py-3 text-slate-400">1 Heartbeat</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-white">Main Memory (RAM) Access</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">100 ns</td>
                  <td className="px-4 py-3 text-slate-400">Quick stretch (3.3 mins)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-white">Read 1 MB sequentially from RAM</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">250 µs</td>
                  <td className="px-4 py-3 text-slate-400">2 Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-white">Read 1 MB sequentially from NVMe SSD</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">1,000 µs (1 ms)</td>
                  <td className="px-4 py-3 text-slate-400">1 Week</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-white">Round Trip within Same Datacenter</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">500 µs</td>
                  <td className="px-4 py-3 text-slate-400">4 Days</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-white">Round Trip California to Netherlands</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">150,000 µs (150 ms)</td>
                  <td className="px-4 py-3 text-slate-400">3 Years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
