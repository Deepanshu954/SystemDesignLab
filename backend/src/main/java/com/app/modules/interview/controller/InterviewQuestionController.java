package com.app.modules.interview.controller;

import com.app.common.base.ApiResponse;
import com.app.modules.interview.dto.InterviewQuestionResponse;
import com.app.modules.interview.service.InterviewQuestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/interview")
@Tag(name = "Interview Preparation", description = "System design interview questions, candidate guides, and evaluation rubrics")
public class InterviewQuestionController {

    private final InterviewQuestionService service;

    public InterviewQuestionController(InterviewQuestionService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "List all published interview questions")
    public ResponseEntity<ApiResponse<List<InterviewQuestionResponse>>> getQuestions(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search) {
        List<InterviewQuestionResponse> response = service.getQuestions(category, difficulty, search);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get detailed interview question and answer guide by ID")
    public ResponseEntity<ApiResponse<InterviewQuestionResponse>> getQuestionById(@PathVariable UUID id) {
        InterviewQuestionResponse response = service.getQuestionById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
