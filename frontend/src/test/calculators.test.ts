import { describe, it, expect } from 'vitest';
import { computeCapacity, formatNumber, formatBytes, formatBps } from '../lib/calculators';

describe('Capacity Calculator Engine', () => {
  it('correctly calculates back-of-the-envelope capacity for TinyURL scale', () => {
    const result = computeCapacity({
      dailyActiveUsers: 10_000_000,
      requestsPerUserDay: 10,
      readWriteRatio: 10,
      payloadSizeBytes: 500,
      retentionYears: 5,
      peakMultiplier: 2.0,
    });

    // 10M DAU * 10 req/day = 100M total reqs/day
    expect(result.totalRequestsPerDay).toBe(100_000_000);

    // 100M / 86400 ≈ 1157.4 QPS
    expect(result.avgQps).toBeCloseTo(1157.4, 1);

    // Peak QPS with 2x multiplier
    expect(result.peakQps).toBeCloseTo(2314.8, 1);

    // Read:Write = 10:1 => Write is 1/11th of total
    expect(result.writeQps).toBeCloseTo(105.2, 1);
    expect(result.readQps).toBeCloseTo(1052.2, 1);

    // Daily storage and cache RAM should be positive
    expect(result.dailyStorageGb).toBeGreaterThan(0);
    expect(result.fiveYearStorageTb).toBeGreaterThan(0);
    expect(result.ramCacheRequiredGb).toBeGreaterThan(0);
  });

  it('handles custom peak multipliers accurately', () => {
    const defaultPeak = computeCapacity({
      dailyActiveUsers: 1_000_000,
      requestsPerUserDay: 1,
      readWriteRatio: 1,
      payloadSizeBytes: 100,
      retentionYears: 1,
      peakMultiplier: 3.0,
    });

    expect(defaultPeak.peakQps).toBeCloseTo(defaultPeak.avgQps * 3, 1);
  });

  it('formats numbers into readable SI suffixes', () => {
    expect(formatNumber(500)).toBe('500');
    expect(formatNumber(1500)).toBe('1.50K');
    expect(formatNumber(10_000_000)).toBe('10.00M');
    expect(formatNumber(2_500_000_000)).toBe('2.50B');
  });

  it('formats bytes into appropriate units', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1024)).toBe('1.00 KB');
    expect(formatBytes(1024 * 1024 * 5)).toBe('5.00 MB');
    expect(formatBytes(1024 * 1024 * 1024 * 2.5)).toBe('2.50 GB');
  });

  it('formats network bandwidth into bps units', () => {
    expect(formatBps(800)).toBe('800 bps');
    expect(formatBps(1_000_000)).toBe('1.00 Mbps');
    expect(formatBps(10_000_000_000)).toBe('10.00 Gbps');
  });
});
