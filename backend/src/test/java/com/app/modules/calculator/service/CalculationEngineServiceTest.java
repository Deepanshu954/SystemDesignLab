package com.app.modules.calculator.service;

import com.app.modules.calculator.dto.CapacityCalculationRequest;
import com.app.modules.calculator.dto.CapacityCalculationResponse;
import com.app.modules.calculator.dto.SystemTemplateResponse;
import org.assertj.core.data.Offset;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class CalculationEngineServiceTest {

    private CalculationEngineService service;

    @BeforeEach
    void setUp() {
        service = new CalculationEngineService();
    }

    @Test
    void calculateCapacity_TinyUrlParameters_ReturnsAccurateMath() {
        // 10M DAU, 10 reqs/day, 10:1 read:write, 500 bytes payload, 5 years retention
        CapacityCalculationRequest request = new CapacityCalculationRequest(
                10_000_000L,
                10.0,
                10.0,
                500L,
                5,
                2.0
        );

        CapacityCalculationResponse response = service.calculateCapacity(request);

        assertThat(response).isNotNull();
        assertThat(response.totalRequestsPerDay()).isEqualTo(100_000_000L);
        assertThat(response.avgQps()).isGreaterThan(1150.0).isLessThan(1160.0);
        assertThat(response.peakQps()).isCloseTo(response.avgQps() * 2.0, Offset.offset(0.05));
        assertThat(response.writeQps()).isGreaterThan(100.0);
        assertThat(response.readQps()).isGreaterThan(1000.0);
        assertThat(response.dailyStorageGb()).isGreaterThan(4.0);
        assertThat(response.fiveYearStorageTb()).isGreaterThan(7.0);
        assertThat(response.ramCacheRequiredGb()).isGreaterThan(8.0);
    }

    @Test
    void getPredefinedTemplates_ReturnsAllTemplates() {
        List<SystemTemplateResponse> templates = service.getPredefinedTemplates();

        assertThat(templates).isNotNull().hasSize(4);
        assertThat(templates).extracting(SystemTemplateResponse::id)
                .containsExactly("tinyurl", "twitter", "chat", "video");
    }
}
