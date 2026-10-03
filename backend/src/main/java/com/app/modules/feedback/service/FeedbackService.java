package com.app.modules.feedback.service;

import com.app.modules.feedback.dto.CreateFeedbackRequest;
import com.app.modules.feedback.dto.FeedbackResponse;
import com.app.modules.feedback.entity.Feedback;
import com.app.modules.feedback.repository.FeedbackRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public FeedbackResponse submitFeedback(UUID userId, CreateFeedbackRequest request) {
        Feedback feedback = new Feedback(
                userId,
                request.pageUrl(),
                request.rating(),
                request.category(),
                request.comment()
        );
        Feedback saved = feedbackRepository.save(feedback);
        return FeedbackResponse.fromEntity(saved);
    }

    public List<FeedbackResponse> getFeedbackForPage(String pageUrl) {
        return feedbackRepository.findByPageUrlOrderByCreatedAtDesc(pageUrl).stream()
                .map(FeedbackResponse::fromEntity)
                .toList();
    }

    public List<FeedbackResponse> getAllFeedback() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(FeedbackResponse::fromEntity)
                .toList();
    }
}
