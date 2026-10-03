'use client';

import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { computeCapacity } from '@/lib/calculators';
import { CapacityCalculationRequest, CapacityCalculationResponse } from '@/types';
import { Calculator, Sparkles, Copy, Check, RefreshCw, HardDrive, Wifi, Cpu, Layers } from 'lucide-react';
import { api } from '@/lib/api';

export default function CapacityCalculatorPage() {
  const [params, setParams] = useState<CapacityCalculationRequest>({
    dailyActiveUsers: 10_000_000,
    requestsPerUserDay: 10,
    readWriteRatio: 10,
    payloadSizeBytes: 500,
    retentionYears: 5,
    peakMultiplier: 2.0,
  });

  const [results, setResults] = useState<CapacityCalculationResponse>(() => computeCapacity(params));
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setResults(computeCapacity(params));
  }, [params]);

  const loadPreset = (preset: {
    dau: number;
    reqs: number;
    ratio: number;
    payload: number;
    years: number;
    peak: number;
  }) => {
    setParams({
      dailyActiveUsers: preset.dau,
      requestsPerUserDay: preset.reqs,
      readWriteRatio: preset.ratio,
      payloadSizeBytes: preset.payload,
      retentionYears: preset.years,
      peakMultiplier: preset.peak,
    });
  };

  const handleSyncWithBackend = async () => {
    setIsSyncing(true);
    try {
      const serverRes = await api.calculateCapacity(params);
      setResults(serverRes);
    } catch {
      // client computed fallback already active
    } finally {
      setIsSyncing(false);
    }
  };

  const copyBreakdown = () => {
    const text = `System Capacity Estimation:
Daily Active Users: ${params.dailyActiveUsers.toLocaleString()}
Requests/User/Day: ${params.requestsPerUserDay}
Read:Write Ratio: ${params.readWriteRatio}:1
Average Payload: ${params.payloadSizeBytes} bytes
Retention: ${params.retentionYears} years

Results:
Total Requests/Day: ${results.totalRequestsPerDay.toLocaleString()}
Average QPS: ${results.avgQps.toLocaleString()} QPS
Peak QPS: ${results.peakQps.toLocaleString()} QPS (x${params.peakMultiplier})
Daily Storage: ${results.dailyStorageGb} GB/day
5-Year Storage: ${results.fiveYearStorageTb} TB
Ingress Bandwidth: ${results.ingressBandwidthMbps} Mbps
Egress Bandwidth: ${results.egressBandwidthMbps} Mbps
80/20 RAM Cache Required: ${results.ramCacheRequiredGb} GB`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs
        items={[
          { label: 'Calculators & Tools', href: '/tools' },
          { label: 'Capacity & Sizing Calculator' },
        ]}
      />

      <div className="mt-4 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-semibold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Engineering Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          System Capacity & Sizing Calculator
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-3xl">
          Rapidly calculate Average QPS, Peak QPS, Daily/5-Year Storage, Ingress/Egress Network Bandwidth, 
          and RAM Cache sizing using the 80/20 Pareto rule.
        </p>
      </div>

      {/* Preset Archetype Buttons */}
      <div className="mb-8 p-4 rounded-xl glass-panel border border-slate-800">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Load Predefined System Archetype:</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => loadPreset({ dau: 10_000_000, reqs: 10, ratio: 10, payload: 500, years: 5, peak: 2.0 })}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-700 transition-all text-slate-200"
          >
            TinyURL (10M DAU, 10:1 Read, 500B)
          </button>
          <button
            onClick={() => loadPreset({ dau: 300_000_000, reqs: 20, ratio: 100, payload: 1024, years: 5, peak: 2.5 })}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-700 transition-all text-slate-200"
          >
            Twitter Feed (300M DAU, 100:1 Read, 1KB)
          </button>
          <button
            onClick={() => loadPreset({ dau: 50_000_000, reqs: 100, ratio: 2, payload: 200, years: 3, peak: 3.0 })}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-700 transition-all text-slate-200"
          >
            Real-Time Chat (50M DAU, 2:1 Read, 200B)
          </button>
          <button
            onClick={() => loadPreset({ dau: 50_000_000, reqs: 5, ratio: 50, payload: 5000, years: 5, peak: 2.0 })}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-cyan-950 hover:text-cyan-300 border border-slate-700 hover:border-cyan-700 transition-all text-slate-200"
          >
            Video Catalog (50M DAU, 50:1 Read, 5KB)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-5 space-y-6 p-6 rounded-2xl glass-panel border border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <span>Input Parameters</span>
          </h2>

          {/* DAU */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Daily Active Users (DAU)</span>
              <span className="text-cyan-400 font-mono">{params.dailyActiveUsers.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="500000000"
              step="500000"
              value={params.dailyActiveUsers}
              onChange={(e) => setParams({ ...params, dailyActiveUsers: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Requests per user day */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Requests per User / Day</span>
              <span className="text-cyan-400 font-mono">{params.requestsPerUserDay}</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              step="1"
              value={params.requestsPerUserDay}
              onChange={(e) => setParams({ ...params, requestsPerUserDay: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Read to Write Ratio */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Read : Write Ratio</span>
              <span className="text-cyan-400 font-mono">{params.readWriteRatio}:1</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              step="1"
              value={params.readWriteRatio}
              onChange={(e) => setParams({ ...params, readWriteRatio: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Payload Size Bytes */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Average Payload Size</span>
              <span className="text-cyan-400 font-mono">{params.payloadSizeBytes.toLocaleString()} Bytes</span>
            </div>
            <input
              type="range"
              min="50"
              max="50000"
              step="50"
              value={params.payloadSizeBytes}
              onChange={(e) => setParams({ ...params, payloadSizeBytes: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Retention Years */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Data Retention</span>
              <span className="text-cyan-400 font-mono">{params.retentionYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={params.retentionYears}
              onChange={(e) => setParams({ ...params, retentionYears: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Peak Traffic Multiplier */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-300">Peak Traffic Multiplier</span>
              <span className="text-cyan-400 font-mono">{params.peakMultiplier}x</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5.0"
              step="0.5"
              value={params.peakMultiplier}
              onChange={(e) => setParams({ ...params, peakMultiplier: Number(e.target.value) })}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleSyncWithBackend}
              disabled={isSyncing}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isSyncing ? 'Verifying...' : 'Validate with Backend API'}</span>
            </button>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Computed Architecture Requirements</h2>
            <button
              onClick={copyBreakdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Summary' : 'Copy Math Breakdown'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* QPS Metric Card */}
            <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 bg-slate-950/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Throughput (QPS)</span>
              </div>
              <div className="pt-2">
                <div className="text-3xl font-extrabold text-white font-mono">{results.avgQps.toLocaleString()}</div>
                <div className="text-xs text-slate-400">Average Requests / Second</div>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Peak QPS ({params.peakMultiplier}x factor):</span>
                <span className="text-cyan-300 font-mono font-bold">{results.peakQps.toLocaleString()} QPS</span>
              </div>
            </div>

            {/* Read vs Write Card */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 bg-slate-950/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Read vs Write Breakdown</span>
              </div>
              <div className="pt-2 flex justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white font-mono">{results.readQps.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Read QPS</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-white font-mono">{results.writeQps.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Write QPS</div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                Daily Requests: <span className="font-mono text-white font-bold">{results.totalRequestsPerDay.toLocaleString()}</span>
              </div>
            </div>

            {/* Storage Card */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 bg-slate-950/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <HardDrive className="w-4 h-4" />
                <span>Storage Requirements</span>
              </div>
              <div className="pt-2">
                <div className="text-3xl font-extrabold text-white font-mono">{results.fiveYearStorageTb.toLocaleString()} TB</div>
                <div className="text-xs text-slate-400">{params.retentionYears}-Year Total Storage Projection</div>
              </div>
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Daily Ingestion Rate:</span>
                <span className="text-emerald-300 font-mono font-bold">{results.dailyStorageGb} GB / Day</span>
              </div>
            </div>

            {/* Network Bandwidth Card */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 bg-slate-950/70 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Wifi className="w-4 h-4" />
                <span>Network Bandwidth</span>
              </div>
              <div className="pt-2 flex justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-white font-mono">{results.ingressBandwidthMbps}</div>
                  <div className="text-xs text-slate-400">Ingress Mbps</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-white font-mono">{results.egressBandwidthMbps}</div>
                  <div className="text-xs text-slate-400">Egress Mbps</div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                Total Bandwidth: <span className="font-mono text-white font-bold">{(results.ingressBandwidthMbps + results.egressBandwidthMbps).toFixed(2)} Mbps</span>
              </div>
            </div>
          </div>

          {/* RAM Cache Sizing Highlight Card */}
          <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 bg-indigo-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>Distributed RAM Cache Sizing (80/20 Pareto Rule)</span>
              </div>
              <span className="text-xs text-indigo-300 bg-indigo-950 border border-indigo-800 px-2 py-0.5 rounded">
                Redis Cluster
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assuming 20% of popular hot requests generate 80% of read traffic, caching 20% of daily read volume in RAM requires:
            </p>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-4xl font-extrabold text-white font-mono">{results.ramCacheRequiredGb}</span>
              <span className="text-base font-bold text-indigo-400">GB RAM</span>
            </div>
            <div className="text-xs text-slate-400">
              Recommended: 2x Redis cluster nodes with 16GB or 32GB RAM each with LRU eviction.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
