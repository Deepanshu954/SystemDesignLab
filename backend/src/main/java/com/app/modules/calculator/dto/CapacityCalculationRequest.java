package com.app.modules.calculator.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record CapacityCalculationRequest(
        @NotNull(message = "Daily active users is required")
        @Positive(message = "Daily active users must be positive")
        Long dailyActiveUsers,

        @NotNull(message = "Requests per user day is required")
        @Positive(message = "Requests per user day must be positive")
        Double requestsPerUserDay,

        @NotNull(message = "Read to write ratio is required")
        @Positive(message = "Read to write ratio must be positive")
        Double readWriteRatio,

        @NotNull(message = "Payload size in bytes is required")
        @Positive(message = "Payload size must be positive")
        Long payloadSizeBytes,

        @NotNull(message = "Retention in years is required")
        @Min(value = 1, message = "Retention must be at least 1 year")
        @Max(value = 20, message = "Retention cannot exceed 20 years")
        Integer retentionYears,

        Double peakMultiplier
) {
    public double getEffectivePeakMultiplier() {
        return (peakMultiplier != null && peakMultiplier >= 1.0) ? peakMultiplier : 2.0;
    }
}
