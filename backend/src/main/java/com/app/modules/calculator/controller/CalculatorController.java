package com.app.modules.calculator.controller;

import com.app.common.base.ApiResponse;
import com.app.modules.calculator.dto.CapacityCalculationRequest;
import com.app.modules.calculator.dto.CapacityCalculationResponse;
import com.app.modules.calculator.dto.SystemTemplateResponse;
import com.app.modules.calculator.service.CalculationEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/calculator")
@Tag(name = "Capacity Calculator", description = "Back-of-the-envelope capacity, bandwidth, and storage estimation engine")
public class CalculatorController {

    private final CalculationEngineService calculationEngineService;

    public CalculatorController(CalculationEngineService calculationEngineService) {
        this.calculationEngineService = calculationEngineService;
    }

    @PostMapping("/capacity")
    @Operation(summary = "Calculate system capacity, QPS, bandwidth, and storage projections")
    public ResponseEntity<ApiResponse<CapacityCalculationResponse>> calculateCapacity(
            @Valid @RequestBody CapacityCalculationRequest request) {
        CapacityCalculationResponse response = calculationEngineService.calculateCapacity(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/templates")
    @Operation(summary = "Get predefined architecture sizing templates")
    public ResponseEntity<ApiResponse<List<SystemTemplateResponse>>> getTemplates() {
        List<SystemTemplateResponse> templates = calculationEngineService.getPredefinedTemplates();
        return ResponseEntity.ok(ApiResponse.success(templates));
    }
}
