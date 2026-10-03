package com.app.modules.calculator.controller;

import com.app.modules.calculator.dto.CapacityCalculationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CalculatorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void calculateCapacity_ValidRequest_ReturnsOkWithCalculations() throws Exception {
        CapacityCalculationRequest request = new CapacityCalculationRequest(
                10_000_000L,
                5.0,
                10.0,
                500L,
                5,
                2.0
        );

        mockMvc.perform(post("/api/v1/calculator/capacity")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.totalRequestsPerDay").value(50000000))
                .andExpect(jsonPath("$.data.avgQps").isNumber())
                .andExpect(jsonPath("$.data.peakQps").isNumber());
    }

    @Test
    void calculateCapacity_InvalidInput_ReturnsBadRequest() throws Exception {
        // Missing required fields
        CapacityCalculationRequest request = new CapacityCalculationRequest(
                -100L, // invalid negative DAU
                0.0,
                0.0,
                0L,
                0,
                0.0
        );

        mockMvc.perform(post("/api/v1/calculator/capacity")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Failed"));
    }

    @Test
    void getTemplates_ReturnsList() throws Exception {
        mockMvc.perform(get("/api/v1/calculator/templates"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].id").value("tinyurl"));
    }
}
