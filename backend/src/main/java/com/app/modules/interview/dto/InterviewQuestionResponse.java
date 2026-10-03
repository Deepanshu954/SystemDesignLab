package com.app.modules.interview.dto;

import com.app.modules.interview.entity.InterviewQuestion;

import java.time.Instant;
import java.util.UUID;

public record InterviewQuestionResponse(
        UUID id,
        String title,
        String category,
        String difficulty,
        String questionText,
        String answerGuide,
        String keyPointsJson,
        Instant createdAt
) {
    public static InterviewQuestionResponse fromEntity(InterviewQuestion entity) {
        return new InterviewQuestionResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getCategory(),
                entity.getDifficulty(),
                entity.getQuestionText(),
                entity.getAnswerGuide(),
                entity.getKeyPointsJson(),
                entity.getCreatedAt()
        );
    }
}
