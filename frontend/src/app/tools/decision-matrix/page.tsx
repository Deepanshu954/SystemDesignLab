'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Layers, Database, Cpu, ArrowRight, ShieldCheck, Check, X } from 'lucide-react';
import Link from 'next/link';

type MatrixCategory = 'DATABASES' | 'CACHING' | 'MESSAGE_QUEUES';

interface ComparisonRow {
  dimension: string;
  optionA: string;
  optionB: string;
  optionC?: string;
  winner: string;
}

export default function DecisionMatrixPage() {
  const [activeCategory, setActiveCategory] = useState<MatrixCategory>('DATABASES');

  const databaseRows: ComparisonRow[] = [
    {
      dimension: 'Data Structure',
      optionA: 'Strict Tables & Foreign Keys (ACID)',
      optionB: 'Partition Key + Clustering Key (LSM-Tree)',
      optionC: 'JSON / BSON Documents (Flexible)',
      winner: 'Context dependent',
    },
    {
      dimension: 'Write Scalability',
      optionA: 'Single primary writer; needs manual sharding',
      optionB: 'Masterless peer-to-peer ring (Linear scale)',
      optionC: 'Replica set with chunk balancing',
      winner: 'Wide-Column (Cassandra / ScyllaDB)',
    },
    {
      dimension: 'Consistency Model',
      optionA: 'Immediate consistency (ACID, 2PC)',
      optionB: 'Tunable consistency (ONE, QUORUM, ALL)',
      optionC: 'Tunable read/write concerns',
      winner: 'Relational (PostgreSQL)',
    },
    {
      dimension: 'Complex Queries / Joins',
      optionA: 'Full SQL JOIN, subqueries, CTEs, Window functions',
      optionB: 'No joins; requires denormalization by query',
      optionC: 'Aggregation pipeline; lookup join (costly)',
      winner: 'Relational (PostgreSQL)',
    },
    {
      dimension: 'Ideal Flagship Use Case',
      optionA: 'Financial transactions, E-commerce inventory, Users',
      optionB: 'Chat message history, IoT metrics, Time-series',
      optionC: 'User profiles, catalogs with evolving schemas',
      winner: 'Design Specific',
    },
  ];

  const cacheRows: ComparisonRow[] = [
    {
      dimension: 'Supported Data Structures',
      optionA: 'Strings, Hashes, Lists, Sets, Sorted Sets, Bitmaps, Streams',
      optionB: 'Pure Key-Value (String / Byte arrays only)',
      winner: 'Redis (Much richer primitives)',
    },
    {
      dimension: 'Persistence to Disk',
      optionA: 'RDB snapshots + Append-Only File (AOF)',
      optionB: 'In-memory only (Lost on power restart)',
      winner: 'Redis',
    },
    {
      dimension: 'Thread Concurrency Model',
      optionA: 'Single-threaded event loop (Multi-threaded I/O since v6)',
      optionB: 'Multi-threaded with internal locks',
      winner: 'Memcached (Simple CPU scaling)',
    },
    {
      dimension: 'High Availability & Clustering',
      optionA: 'Redis Sentinel (Auto failover) + Redis Cluster (Sharding)',
      optionB: 'Client-side consistent hashing across nodes',
      winner: 'Redis',
    },
    {
      dimension: 'Ideal Production Fit',
      optionA: 'Rate limiting, leaderboard sorted sets, session store',
      optionB: 'Large static HTML page fragments, read-heavy caching',
      winner: 'Redis for most modern systems',
    },
  ];

  const queueRows: ComparisonRow[] = [
    {
      dimension: 'Architecture Model',
      optionA: 'Distributed append-only commit log (Pull-based)',
      optionB: 'Smart broker, dumb consumer message broker (Push-based)',
      winner: 'Depends on throughput requirements',
    },
    {
      dimension: 'Message Retention & Replay',
      optionA: 'Retained on disk for days/weeks; replayable by offset',
      optionB: 'Deleted once acknowledged by consumer',
      winner: 'Kafka (Event sourcing & analytics)',
    },
    {
      dimension: 'Throughput Capacity',
      optionA: '1,000,000+ msgs/sec via sequential disk & batching',
      optionB: '50,000 - 100,000 msgs/sec with complex routing',
      winner: 'Kafka',
    },
    {
      dimension: 'Complex Routing & Filtering',
      optionA: 'Topic and partition routing only',
      optionB: 'Direct, Topic, Fanout, and Headers exchanges',
      winner: 'RabbitMQ (Superior routing topologies)',
    },
    {
      dimension: 'Ideal Production Fit',
      optionA: 'Event streaming, clickstream ingestion, audit log',
      optionB: 'Transactional task queues, email dispatch, RPC',
      winner: 'RabbitMQ for microtask queues; Kafka for logs',
    },
  ];

  const getActiveRows = () => {
    switch (activeCategory) {
      case 'DATABASES':
        return {
          headers: ['PostgreSQL (Relational)', 'ScyllaDB / Cassandra (Wide-Column)', 'MongoDB (Document)'],
          rows: databaseRows,
        };
      case 'CACHING':
        return {
          headers: ['Redis', 'Memcached'],
          rows: cacheRows,
        };
      case 'MESSAGE_QUEUES':
        return {
          headers: ['Apache Kafka', 'RabbitMQ'],
          rows: queueRows,
        };
    }
  };

  const currentData = getActiveRows();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Calculators & Tools', href: '/tools' },
          { label: 'Architecture Decision Matrix' },
        ]}
      />

      <div className="mt-4 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Architectural Trade-Off Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Architecture Decision Matrix
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
          Evaluate technologies side-by-side using concrete engineering dimensions: throughput, latency, 
          concurrency, consistency guarantees, and operational complexity.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 p-1.5 rounded-xl glass-panel border border-slate-800 max-w-md mb-8">
        <button
          onClick={() => setActiveCategory('DATABASES')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'DATABASES'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Databases
        </button>
        <button
          onClick={() => setActiveCategory('CACHING')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'CACHING'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Caching
        </button>
        <button
          onClick={() => setActiveCategory('MESSAGE_QUEUES')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            activeCategory === 'MESSAGE_QUEUES'
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Message Queues
        </button>
      </div>

      {/* Matrix Table */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 font-bold text-white w-1/4">Evaluation Dimension</th>
                {currentData.headers.map((hdr, idx) => (
                  <th key={idx} className="px-6 py-4 font-bold text-cyan-400">
                    {hdr}
                  </th>
                ))}
                <th className="px-6 py-4 font-bold text-indigo-400 w-1/4">Architecture Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
              {currentData.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 font-semibold text-white bg-slate-950/40">
                    {row.dimension}
                  </td>
                  <td className="px-6 py-4 text-slate-300">{row.optionA}</td>
                  <td className="px-6 py-4 text-slate-300">{row.optionB}</td>
                  {row.optionC && <td className="px-6 py-4 text-slate-300">{row.optionC}</td>}
                  <td className="px-6 py-4 text-indigo-300 font-medium bg-indigo-950/20">
                    {row.winner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Step Links */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h3 className="font-bold text-white text-sm">Need exact capacity sizing for your chosen stack?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Calculate memory cache size, disk throughput, and QPS using our interactive calculator.
          </p>
        </div>
        <Link
          href="/tools/capacity-calculator"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
        >
          <span>Open Capacity Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
