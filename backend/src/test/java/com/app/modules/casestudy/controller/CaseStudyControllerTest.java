package com.app.modules.casestudy.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CaseStudyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getCaseStudies_ReturnsPublishedList() throws Exception {
        mockMvc.perform(get("/api/v1/case-studies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(4))
                .andExpect(jsonPath("$.data[0].slug").value("url-shortener"));
    }

    @Test
    void getCaseStudies_WithSearchQuery_ReturnsFiltered() throws Exception {
        mockMvc.perform(get("/api/v1/case-studies?search=rate"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(1))
                .andExpect(jsonPath("$.data[0].slug").value("rate-limiter"));
    }

    @Test
    void getCaseStudyBySlug_ExistingSlug_ReturnsDetail() throws Exception {
        mockMvc.perform(get("/api/v1/case-studies/url-shortener"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.slug").value("url-shortener"))
                .andExpect(jsonPath("$.data.title").value("Design a Distributed URL Shortener (TinyURL)"))
                .andExpect(jsonPath("$.data.architectureDiagramJson").isNotEmpty())
                .andExpect(jsonPath("$.data.capacityMathJson").isNotEmpty())
                .andExpect(jsonPath("$.data.fullContentMarkdown").isNotEmpty());
    }

    @Test
    void getCaseStudyBySlug_NotFound_Returns404ProblemDetail() throws Exception {
        mockMvc.perform(get("/api/v1/case-studies/unknown-system"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Resource Not Found"))
                .andExpect(jsonPath("$.status").value(404));
    }
}
