import Link from 'next/link';
import { Calculator, GitFork, Gauge, ArrowRight, Database, Zap, Cpu, Server } from 'lucide-react';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata = {
  title: 'Interactive System Design Tools & Calculators',
  description: 'Hands-on architectural tools: Back-of-the-envelope capacity estimation, technology decision matrix, and latency comparison visualizers.',
};

export default function ToolsIndexPage() {
  const tools = [
    {
      title: 'Capacity & Storage Estimator',
      description: 'Calculate QPS (peak & average), network ingress/egress bandwidth, annual storage growth, and Redis memory cache footprint with instant industry templates.',
      href: '/tools/capacity-calculator',
      icon: Calculator,
      badge: 'Popular',
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400',
      stats: 'DAU • QPS • RAM • IOPS',
    },
    {
      title: 'Architecture Decision Matrix',
      description: 'Interactive comparison engine evaluating PostgreSQL, DynamoDB, Redis, Kafka, Cassandra, and ElasticSearch across ACID, latency, and scaling vectors.',
      href: '/tools/decision-matrix',
      icon: GitFork,
      badge: 'Interactive',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
      stats: 'ACID • Latency • Trade-offs',
    },
  ];

  const latencyNumbers = [
    { operation: 'L1 cache reference', time: '0.5 ns', scale: '1x (baseline)', icon: Cpu },
    { operation: 'Branch mispredict', time: '5 ns', scale: '10x slower', icon: Cpu },
    { operation: 'L2 cache reference', time: '7 ns', scale: '14x slower', icon: Cpu },
    { operation: 'Mutex lock/unlock', time: '25 ns', scale: '50x slower', icon: Zap },
    { operation: 'Main memory (RAM) reference', time: '100 ns', scale: '200x slower', icon: Cpu },
    { operation: 'Compress 1KB with Snappy', time: '2,000 ns (2 µs)', scale: '4,000x slower', icon: Zap },
    { operation: 'Read 1 MB sequentially from RAM', time: '250,000 ns (250 µs)', scale: '500,000x slower', icon: Server },
    { operation: 'Read 1 MB sequentially from SSD', time: '1,000,000 ns (1 ms)', scale: '2,000,000x slower', icon: Database },
    { operation: 'Round trip within same datacenter', time: '500,000 ns (0.5 ms)', scale: '1,000,000x slower', icon: Gauge },
    { operation: 'Disk seek (HDD)', time: '10,000,000 ns (10 ms)', scale: '20,000,000x slower', icon: Database },
    { operation: 'Send packet CA to Netherlands & back', time: '150,000,000 ns (150 ms)', scale: '300,000,000x slower', icon: Gauge },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Interactive Tools' }]} />

      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Design Tools & Calculators
        </h1>
        <p className="mt-2 text-lg text-slate-400 max-w-3xl">
          Eliminate guesswork in your architectural designs. Use these quantitative calculators, trade-off matrices, and latency references during mock interviews and real-world system modeling.
        </p>
      </div>

      {/* Featured Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-blue-400 border border-slate-700">
                    {tool.badge}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">{tool.stats}</span>
                <span className="text-sm font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Launch Tool <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Latency Numbers Reference Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Latency Numbers Every Systems Engineer Must Know
            </h2>
            <p className="text-sm text-slate-400">
              Essential hardware latency scale based on Jeff Dean and Peter Norvig's computer latency hierarchy.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">Operation</th>
                <th className="px-4 py-3">Latency Duration</th>
                <th className="px-4 py-3 rounded-r-lg">Human Scaled Comparison</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {latencyNumbers.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-200 flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-slate-500" />
                    {item.operation}
                  </td>
                  <td className="px-4 py-3 font-mono text-emerald-400 font-semibold">
                    {item.time}
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                    {item.scale}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
