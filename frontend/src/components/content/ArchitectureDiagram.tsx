'use client';

import React from 'react';
import { Server, Database, Cpu, Globe, ArrowRight, Layers } from 'lucide-react';

interface DiagramNode {
  id: string;
  label: string;
  type?: string;
}

interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

interface ArchitectureDiagramProps {
  diagramJson?: string;
  title?: string;
}

export default function ArchitectureDiagram({ diagramJson, title }: ArchitectureDiagramProps) {
  let nodes: DiagramNode[] = [];
  let edges: DiagramEdge[] = [];

  if (diagramJson) {
    try {
      const parsed = JSON.parse(diagramJson);
      nodes = parsed.nodes || [];
      edges = parsed.edges || [];
    } catch {
      // ignore parse error and use default
    }
  }

  if (nodes.length === 0) {
    nodes = [
      { id: 'client', label: 'Clients (Web / Mobile)', type: 'client' },
      { id: 'lb', label: 'Layer 7 Load Balancer', type: 'network' },
      { id: 'api', label: 'Application Cluster', type: 'compute' },
      { id: 'cache', label: 'Distributed Cache (Redis)', type: 'cache' },
      { id: 'db', label: 'Primary Datastore', type: 'database' },
    ];
    edges = [
      { from: 'client', to: 'lb' },
      { from: 'lb', to: 'api' },
      { from: 'api', to: 'cache' },
      { from: 'api', to: 'db' },
    ];
  }

  const getNodeIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('client') || l.includes('mobile') || l.includes('web')) return Globe;
    if (l.includes('db') || l.includes('database') || l.includes('postgres') || l.includes('cassandra') || l.includes('store'))
      return Database;
    if (l.includes('cache') || l.includes('redis') || l.includes('memcached')) return Cpu;
    return Server;
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-white text-base">
            {title || 'High-Level Architecture Topology'}
          </h3>
        </div>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          Interactive Topology
        </span>
      </div>

      {/* Nodes Cards Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node, index) => {
          const Icon = getNodeIcon(node.label);
          // find outgoing connections
          const outgoing = edges.filter((e) => e.from === node.id);

          return (
            <div
              key={node.id}
              className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-blue-500/40 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500">
                    Component #{index + 1}
                  </span>
                  <div className="font-semibold text-white text-sm">{node.label}</div>
                </div>
              </div>

              {outgoing.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-900 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-slate-500">Routes to:</span>
                  {outgoing.map((edge, eIdx) => {
                    const targetNode = nodes.find((n) => n.id === edge.to);
                    return (
                      <span
                        key={eIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-blue-300"
                      >
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        {targetNode?.label.split(' ')[0] || edge.to}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
