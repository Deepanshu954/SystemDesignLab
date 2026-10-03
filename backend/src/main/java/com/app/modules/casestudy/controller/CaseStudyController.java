package com.app.modules.casestudy.controller;

import com.app.common.base.ApiResponse;
import com.app.modules.casestudy.dto.CaseStudyDetailResponse;
import com.app.modules.casestudy.dto.CaseStudySummaryResponse;
import com.app.modules.casestudy.service.CaseStudyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/case-studies")
@Tag(name = "Case Studies", description = "High-scale system design case studies and architectural blueprints")
public class CaseStudyController {

    private final CaseStudyService caseStudyService;

    public CaseStudyController(CaseStudyService caseStudyService) {
        this.caseStudyService = caseStudyService;
    }

    @GetMapping
    @Operation(summary = "List all published case studies with optional filtering")
    public ResponseEntity<ApiResponse<List<CaseStudySummaryResponse>>> getCaseStudies(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search) {
        List<CaseStudySummaryResponse> response = caseStudyService.getCaseStudies(category, difficulty, search);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get complete case study details by slug")
    public ResponseEntity<ApiResponse<CaseStudyDetailResponse>> getCaseStudyBySlug(@PathVariable String slug) {
        CaseStudyDetailResponse response = caseStudyService.getCaseStudyBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
