package com.app.modules.fundamentals.dto;

import com.app.modules.fundamentals.entity.Concept;

import java.time.Instant;
import java.util.UUID;

public record ConceptSummaryResponse(
        UUID id,
        String slug,
        String title,
        String summary,
        String category,
        String difficulty,
        int readingTimeMinutes,
        Instant createdAt
) {
    public static ConceptSummaryResponse fromEntity(Concept entity) {
        return new ConceptSummaryResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getSummary(),
                entity.getCategory(),
                entity.getDifficulty(),
                entity.getReadingTimeMinutes(),
                entity.getCreatedAt()
        );
    }
}
