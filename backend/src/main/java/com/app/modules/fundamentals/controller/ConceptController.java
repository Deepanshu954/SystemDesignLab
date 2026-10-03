package com.app.modules.fundamentals.controller;

import com.app.common.base.ApiResponse;
import com.app.modules.fundamentals.dto.ConceptDetailResponse;
import com.app.modules.fundamentals.dto.ConceptSummaryResponse;
import com.app.modules.fundamentals.service.ConceptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fundamentals")
@Tag(name = "Fundamentals", description = "Core system design concepts, building blocks, and architectural trade-offs")
public class ConceptController {

    private final ConceptService conceptService;

    public ConceptController(ConceptService conceptService) {
        this.conceptService = conceptService;
    }

    @GetMapping
    @Operation(summary = "List all published fundamental concepts")
    public ResponseEntity<ApiResponse<List<ConceptSummaryResponse>>> getConcepts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<ConceptSummaryResponse> response = conceptService.getConcepts(category, search);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get full fundamental concept guide by slug")
    public ResponseEntity<ApiResponse<ConceptDetailResponse>> getConceptBySlug(@PathVariable String slug) {
        ConceptDetailResponse response = conceptService.getConceptBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
