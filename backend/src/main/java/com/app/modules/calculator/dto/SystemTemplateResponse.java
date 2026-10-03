package com.app.modules.calculator.dto;

public record SystemTemplateResponse(
        String id,
        String name,
        String description,
        long dailyActiveUsers,
        double requestsPerUserDay,
        double readWriteRatio,
        long payloadSizeBytes,
        int retentionYears,
        double peakMultiplier
) {
}
