package com.app.modules.feedback.controller;

import com.app.common.base.ApiResponse;
import com.app.common.security.UserPrincipal;
import com.app.modules.feedback.dto.CreateFeedbackRequest;
import com.app.modules.feedback.dto.FeedbackResponse;
import com.app.modules.feedback.service.FeedbackService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/feedback")
@Tag(name = "Feedback & Analytics", description = "Student feedback, page ratings, and coursework measurement metrics")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    @Operation(summary = "Submit page rating and feedback")
    public ResponseEntity<ApiResponse<FeedbackResponse>> submitFeedback(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateFeedbackRequest request) {
        UUID userId = principal != null ? principal.getId() : null;
        FeedbackResponse response = feedbackService.submitFeedback(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Feedback received. Thank you!", response));
    }

    @GetMapping
    @Operation(summary = "Get feedback entries (optionally filtered by pageUrl)")
    public ResponseEntity<ApiResponse<List<FeedbackResponse>>> getFeedback(
            @RequestParam(required = false) String pageUrl) {
        List<FeedbackResponse> response;
        if (pageUrl != null && !pageUrl.isBlank()) {
            response = feedbackService.getFeedbackForPage(pageUrl);
        } else {
            response = feedbackService.getAllFeedback();
        }
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
