package com.app.modules.casestudy.dto;

import com.app.modules.casestudy.entity.CaseStudy;

import java.time.Instant;
import java.util.UUID;

public record CaseStudyDetailResponse(
        UUID id,
        String slug,
        String title,
        String summary,
        String difficulty,
        String category,
        int readingTimeMinutes,
        String architectureDiagramJson,
        String capacityMathJson,
        String fullContentMarkdown,
        Instant createdAt,
        Instant updatedAt
) {
    public static CaseStudyDetailResponse fromEntity(CaseStudy entity) {
        return new CaseStudyDetailResponse(
                entity.getId(),
                entity.getSlug(),
                entity.getTitle(),
                entity.getSummary(),
                entity.getDifficulty(),
                entity.getCategory(),
                entity.getReadingTimeMinutes(),
                entity.getArchitectureDiagramJson(),
                entity.getCapacityMathJson(),
                entity.getFullContentMarkdown(),
                entity.getCreatedAt(),
                entity.getUpdatedAt()
        );
    }
}
