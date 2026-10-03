package com.app.modules.casestudy.dto;

import com.app.modules.casestudy.entity.CaseStudy;

import java.time.Instant;
import java.util.UUID;

public record CaseStudySummaryResponse(
        UUID id,
        String slug,
        String title,
        String summary,
        String difficulty,
        String category,
        int readingTimeMinutes,
        Instant createdAt
) {
    public static CaseStudySummaryResponse fromEntity(CaseStudy entity) {
        return new CaseStudySummaryResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getSummary(),
                entity.getDifficulty(),
                entity.getCategory(),
                entity.getReadingTimeMinutes(),
                entity.getCreatedAt()
        );
    }
}
