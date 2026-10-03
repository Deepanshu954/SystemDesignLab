import Link from 'next/link';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers, Terminal } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';

export const metadata = {
  title: 'System Design Interview Questions & Framework for Beginners',
  description: 'The complete beginner blueprint for cracking system design interviews: 45-minute timeline, step-by-step framework, capacity estimation, SQL vs NoSQL, and common traps.',
};

export default function BeginnersInterviewPrepPage() {
  const traps = [
    {
      title: 'Jumping straight to architecture diagrams',
      description: 'Never start drawing boxes before clarifying functional requirements, scale (DAU/QPS), and data retention policies.',
    },
    {
      title: 'Guessing technology without justifying trade-offs',
      description: 'Saying "I will use MongoDB because it is fast" is an instant red flag. Explain why document storage fits the access pattern over relational ACID guarantees.',
    },
    {
      title: 'Ignoring Single Points of Failure (SPOF)',
      description: 'Every component must have redundancy. State clearly: "To avoid this load balancer being a single point of failure, we deploy an active-passive pair with VRRP/Keepalived."',
    },
    {
      title: 'Over-engineering day-one scale',
      description: 'Do not deploy Kafka, Kubernetes, and Cassandra for an internal tool with 100 DAU. Scale incrementally: start simple, then identify bottlenecks and evolve.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JsonLd
        type="TechArticle"
        data={{
          headline: 'System Design Interview Questions & Guide for Beginners',
          description: 'A comprehensive 45-minute blueprint for candidates new to system design interviews.',
          articleSection: 'Interview Preparation',
        }}
      />

      <Breadcrumbs
        items={[
          { label: 'Interview Prep', href: '/interview-prep' },
          { label: 'Beginners Guide' },
        ]}
      />

      <div className="mt-6 mb-10 pb-8 border-b border-slate-800">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          The Beginner's Comprehensive Playbook
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          System Design for Beginners: The 45-Minute Framework
        </h1>
        <p className="mt-4 text-lg text-slate-400 leading-relaxed max-w-3xl">
          Everything you need to successfully navigate your first system design interview. Learn the exact 4-step framework top tech interviewers grade on, with real formulas, communication tactics, and common traps.
        </p>
      </div>

      {/* 4-Step Framework Deep Dive */}
      <div className="space-y-12">
        {/* Step 1 */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold font-mono text-sm flex items-center justify-center border border-blue-500/40">
              01
            </span>
            <h2 className="text-2xl font-bold text-white">Step 1: Clarify Scope & Functional Requirements (5 Mins)</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            System design interview prompts are intentionally ambiguous (e.g. <em>"Design TinyURL"</em> or <em>"Design Twitter"</em>). Your primary job in the first 5 minutes is asking clarifying questions to define the system boundaries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <h4 className="font-semibold text-white text-sm mb-2 text-blue-300">Functional Requirements</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc ml-4">
                <li>What core actions does the user perform?</li>
                <li>What are the primary input and output formats?</li>
                <li>Can users provide custom aliases or parameters?</li>
                <li>What features are explicitly OUT of scope today?</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <h4 className="font-semibold text-white text-sm mb-2 text-emerald-300">Non-Functional Requirements</h4>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc ml-4">
                <li>What is the latency SLA? (e.g. &lt;10ms p99 for reads)</li>
                <li>Availability target? (e.g. 99.99% vs 99.999%)</li>
                <li>Consistency model? (Strict ACID vs Eventual Consistency)</li>
                <li>What is the expected scale? (DAU, write/read ratio)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 2 */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-bold font-mono text-sm flex items-center justify-center border border-purple-500/40">
              02
            </span>
            <h2 className="text-2xl font-bold text-white">Step 2: Back-of-the-Envelope Capacity Estimation (7 Mins)</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Do not skip estimation! It dictates whether you need a single relational database or a distributed multi-node Cassandra cluster.
          </p>
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs text-slate-300 space-y-2">
            <div><strong>Rule of Thumb:</strong> 1 Day ≈ 86,400 Seconds ≈ 100,000 for quick mental math.</div>
            <div><strong>QPS Formula:</strong> Daily Requests ÷ 86,400 seconds = Avg QPS (Multiply by 2x for Peak QPS).</div>
            <div><strong>Storage Formula:</strong> Daily Writes × Payload Size × 365 Days × Years.</div>
            <div><strong>Cache RAM (80/20 Rule):</strong> Daily Read Requests × 20% × Payload Size.</div>
          </div>
          <div className="mt-4">
            <Link
              href="/tools/capacity-calculator"
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Practice with our interactive Capacity Calculator →
            </Link>
          </div>
        </section>

        {/* Step 3 */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold font-mono text-sm flex items-center justify-center border border-amber-500/40">
              03
            </span>
            <h2 className="text-2xl font-bold text-white">Step 3: High-Level Architecture & API Design (15 Mins)</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Sketch the core end-to-end request flow. Every standard web architecture consists of 5 modular tiers:
          </p>
          <ol className="list-decimal ml-5 text-sm text-slate-300 space-y-2 mb-6">
            <li><strong>Clients & DNS:</strong> Mobile apps, web browsers, and CDN (Cloudflare) for static caching.</li>
            <li><strong>Load Balancer:</strong> NGINX or AWS ALB routing traffic across stateless app instances.</li>
            <li><strong>Application Layer:</strong> Stateless microservices handling business logic and auth.</li>
            <li><strong>Cache Layer:</strong> Redis / Memcached handling 80% of read queries with sub-2ms latency.</li>
            <li><strong>Persistence Layer:</strong> Relational (PostgreSQL) or NoSQL (Cassandra / DynamoDB).</li>
          </ol>
        </section>

        {/* Step 4 */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold font-mono text-sm flex items-center justify-center border border-emerald-500/40">
              04
            </span>
            <h2 className="text-2xl font-bold text-white">Step 4: Deep Dives, Bottlenecks & Failure Modes (18 Mins)</h2>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            This is where senior candidates stand out from juniors. The interviewer will challenge your design with edge cases and failures:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <h4 className="font-semibold text-white text-sm mb-2 text-rose-300">Failure Scenarios</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                What happens if the Redis cache crashes? What happens if network partitions isolate a database node? How do you prevent replication lag inconsistencies?
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
              <h4 className="font-semibold text-white text-sm mb-2 text-emerald-300">Scaling Mitigations</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Horizontal sharding by consistent hashing, circuit breakers (Resilience4j), read replicas with connection pooling, and message queues for asynchronous buffering.
              </p>
            </div>
          </div>
        </section>

        {/* 4 Common Traps */}
        <section className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            4 Common Traps Beginners Must Avoid
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {traps.map((trap, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/80">
                <h3 className="font-bold text-rose-300 text-sm mb-2">❌ {trap.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{trap.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Next Steps */}
      <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to examine a real 24-step case study?</h3>
          <p className="text-xs text-slate-400 mt-1">Review the complete Distributed URL Shortener blueprint.</p>
        </div>
        <Link
          href="/case-studies/url-shortener"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center gap-2 transition-colors"
        >
          View Flagship Blueprint <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
