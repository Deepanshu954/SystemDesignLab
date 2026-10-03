package com.app.modules.fundamentals.controller;

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
class ConceptControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getConcepts_ReturnsAllPublished() throws Exception {
        mockMvc.perform(get("/api/v1/fundamentals"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.length()").value(5))
                .andExpect(jsonPath("$.data[0].slug").value("hld-vs-lld"));
    }

    @Test
    void getConcepts_SearchFilter_ReturnsMatching() throws Exception {
        mockMvc.perform(get("/api/v1/fundamentals?search=caching"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data[0].slug").value("caching"));
    }

    @Test
    void getConceptBySlug_ExistingSlug_ReturnsDetail() throws Exception {
        mockMvc.perform(get("/api/v1/fundamentals/hld-vs-lld"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.slug").value("hld-vs-lld"))
                .andExpect(jsonPath("$.data.title").value("High-Level Design (HLD) vs Low-Level Design (LLD)"))
                .andExpect(jsonPath("$.data.fullContentMarkdown").isNotEmpty())
                .andExpect(jsonPath("$.data.keyTakeawaysJson").isNotEmpty());
    }

    @Test
    void getConceptBySlug_NotFound_Returns404ProblemDetail() throws Exception {
        mockMvc.perform(get("/api/v1/fundamentals/unknown-concept"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Resource Not Found"))
                .andExpect(jsonPath("$.status").value(404));
    }
}
