package com.app.modules.fundamentals.dto;

import com.app.modules.fundamentals.entity.Concept;

import java.time.Instant;
import java.util.UUID;

public record ConceptDetailResponse(
        UUID id,
        String slug,
        String title,
        String summary,
        String category,
        String difficulty,
        int readingTimeMinutes,
        String keyTakeawaysJson,
        String fullContentMarkdown,
        Instant createdAt,
        Instant updatedAt
) {
    public static ConceptDetailResponse fromEntity(Concept entity) {
        return new ConceptDetailResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getSummary(),
                entity.getCategory(),
                entity.getDifficulty(),
                entity.getReadingTimeMinutes(),
                entity.getKeyTakeawaysJson(),
                entity.getFullContentMarkdown(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
