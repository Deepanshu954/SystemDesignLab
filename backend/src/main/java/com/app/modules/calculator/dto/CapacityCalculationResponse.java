package com.app.modules.calculator.dto;

public record CapacityCalculationResponse(
        long totalRequestsPerDay,
        double avgQps,
        double peakQps,
        double writeQps,
        double readQps,
        double dailyStorageGb,
        double fiveYearStorageTb,
        double ingressBandwidthMbps,
        double egressBandwidthMbps,
        double ramCacheRequiredGb
) {
}
