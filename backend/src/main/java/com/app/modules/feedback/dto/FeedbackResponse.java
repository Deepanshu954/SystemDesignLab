package com.app.modules.feedback.dto;

import com.app.modules.feedback.entity.Feedback;

import java.time.Instant;
import java.util.UUID;

public record FeedbackResponse(
        UUID id,
        UUID userId,
        String pageUrl,
        Integer rating,
        String category,
        String comment,
        String status,
        Instant createdAt
) {
    public static FeedbackResponse fromEntity(Feedback entity) {
        return new FeedbackResponse(
                entity.getId(),
                entity.getUserId(),
                entity.getPageUrl(),
                entity.getRating(),
                entity.getCategory(),
                entity.getComment(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }
}
