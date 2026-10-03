package com.app.modules.calculator.service;

import com.app.modules.calculator.dto.CapacityCalculationRequest;
import com.app.modules.calculator.dto.CapacityCalculationResponse;
import com.app.modules.calculator.dto.SystemTemplateResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class CalculationEngineService {

    private static final double SECONDS_IN_A_DAY = 86400.0;
    private static final double BYTES_IN_GB = 1024.0 * 1024.0 * 1024.0;
    private static final double BYTES_IN_TB = BYTES_IN_GB * 1024.0;

    public CapacityCalculationResponse calculateCapacity(CapacityCalculationRequest request) {
        long totalRequestsPerDay = (long) (request.dailyActiveUsers() * request.requestsPerUserDay());
        double avgQps = totalRequestsPerDay / SECONDS_IN_A_DAY;
        double peakQps = avgQps * request.getEffectivePeakMultiplier();

        double ratio = request.readWriteRatio();
        double writeFraction = 1.0 / (1.0 + ratio);
        double readFraction = ratio / (1.0 + ratio);

        double writeQps = avgQps * writeFraction;
        double readQps = avgQps * readFraction;

        double dailyWrites = totalRequestsPerDay * writeFraction;
        double dailyStorageBytes = dailyWrites * request.payloadSizeBytes();
        double dailyStorageGb = dailyStorageBytes / BYTES_IN_GB;

        double totalStorageBytes = dailyStorageBytes * 365.0 * request.retentionYears();
        double fiveYearStorageTb = totalStorageBytes / BYTES_IN_TB;

        double ingressBytesPerSec = writeQps * request.payloadSizeBytes();
        double ingressBandwidthMbps = (ingressBytesPerSec * 8.0) / 1_000_000.0;

        double egressBytesPerSec = readQps * request.payloadSizeBytes();
        double egressBandwidthMbps = (egressBytesPerSec * 8.0) / 1_000_000.0;

        double dailyReads = totalRequestsPerDay * readFraction;
        double ramCacheRequiredBytes = dailyReads * 0.20 * request.payloadSizeBytes();
        double ramCacheRequiredGb = ramCacheRequiredBytes / BYTES_IN_GB;

        return new CapacityCalculationResponse(
                totalRequestsPerDay,
                round(avgQps),
                round(peakQps),
                round(writeQps),
                round(readQps),
                round(dailyStorageGb),
                round(fiveYearStorageTb),
                round(ingressBandwidthMbps),
                round(egressBandwidthMbps),
                round(ramCacheRequiredGb)
        );
    }

    public List<SystemTemplateResponse> getPredefinedTemplates() {
        return List.of(
                new SystemTemplateResponse(
                        "tinyurl",
                        "TinyURL Distributed URL Shortener",
                        "High read-to-write ratio URL redirection system with compact payloads",
                        10_000_000L,
                        10.0,
                        10.0,
                        500L,
                        5,
                        2.0
                ),
                new SystemTemplateResponse(
                        "twitter",
                        "Social Timeline / Twitter Feed",
                        "Massive read-dominant feed system with 100:1 read:write ratio",
                        300_000_000L,
                        20.0,
                        100.0,
                        1024L,
                        5,
                        2.5
                ),
                new SystemTemplateResponse(
                        "chat",
                        "Real-Time Chat Platform",
                        "High write frequency messaging application with fast retention",
                        50_000_000L,
                        100.0,
                        2.0,
                        200L,
                        3,
                        3.0
                ),
                new SystemTemplateResponse(
                        "video",
                        "Video Streaming Metadata Service",
                        "Large media metadata and catalog retrieval pipeline",
                        50_000_000L,
                        5.0,
                        50.0,
                        5000L,
                        5,
                        2.0
                )
        );
    }

    private double round(double value) {
        return BigDecimal.valueOf(value)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
