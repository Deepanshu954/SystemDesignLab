import { CapacityCalculationRequest, CapacityCalculationResponse } from '@/types';

const SECONDS_IN_A_DAY = 86400.0;
const BYTES_IN_GB = 1024.0 * 1024.0 * 1024.0;
const BYTES_IN_TB = BYTES_IN_GB * 1024.0;

function round(val: number): number {
  return Math.round(val * 100) / 100;
}

export function computeCapacity(req: CapacityCalculationRequest): CapacityCalculationResponse {
  const peakMultiplier = req.peakMultiplier && req.peakMultiplier >= 1 ? req.peakMultiplier : 2.0;
  const totalRequestsPerDay = Math.floor(req.dailyActiveUsers * req.requestsPerUserDay);
  const avgQps = totalRequestsPerDay / SECONDS_IN_A_DAY;
  const peakQps = avgQps * peakMultiplier;

  const ratio = req.readWriteRatio;
  const writeFraction = 1.0 / (1.0 + ratio);
  const readFraction = ratio / (1.0 + ratio);

  const writeQps = avgQps * writeFraction;
  const readQps = avgQps * readFraction;

  const dailyWrites = totalRequestsPerDay * writeFraction;
  const dailyStorageBytes = dailyWrites * req.payloadSizeBytes;
  const dailyStorageGb = dailyStorageBytes / BYTES_IN_GB;

  const totalStorageBytes = dailyStorageBytes * 365.0 * req.retentionYears;
  const fiveYearStorageTb = totalStorageBytes / BYTES_IN_TB;

  const ingressBytesPerSec = writeQps * req.payloadSizeBytes;
  const ingressBandwidthMbps = (ingressBytesPerSec * 8.0) / 1_000_000.0;

  const egressBytesPerSec = readQps * req.payloadSizeBytes;
  const egressBandwidthMbps = (egressBytesPerSec * 8.0) / 1_000_000.0;

  const dailyReads = totalRequestsPerDay * readFraction;
  const ramCacheRequiredBytes = dailyReads * 0.20 * req.payloadSizeBytes;
  const ramCacheRequiredGb = ramCacheRequiredBytes / BYTES_IN_GB;

  return {
    totalRequestsPerDay,
    avgQps: round(avgQps),
    peakQps: round(peakQps),
    writeQps: round(writeQps),
    readQps: round(readQps),
    dailyStorageGb: round(dailyStorageGb),
    fiveYearStorageTb: round(fiveYearStorageTb),
    ingressBandwidthMbps: round(ingressBandwidthMbps),
    egressBandwidthMbps: round(egressBandwidthMbps),
    ramCacheRequiredGb: round(ramCacheRequiredGb),
  };
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  }
  return num.toString();
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2)} TB`;
  }
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${bytes} B`;
}

export function formatBps(bps: number): string {
  if (bps >= 1_000_000_000) {
    return `${(bps / 1_000_000_000).toFixed(2)} Gbps`;
  }
  if (bps >= 1_000_000) {
    return `${(bps / 1_000_000).toFixed(2)} Mbps`;
  }
  if (bps >= 1_000) {
    return `${(bps / 1_000).toFixed(2)} Kbps`;
  }
  return `${bps} bps`;
}
