package com.app.modules.user.controller;

import com.app.common.security.JwtTokenProvider;
import com.app.modules.user.dto.CreateBookmarkRequest;
import com.app.modules.user.entity.User;
import com.app.modules.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BookmarkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private String userToken;
    private UUID testUserId;

    @BeforeEach
    void setUp() {
        User user = userRepository.findByEmailIgnoreCase("student@systemdesignlab.dev").orElseThrow();
        testUserId = user.getId();
        userToken = jwtTokenProvider.generateToken(testUserId, user.getEmail(), user.getRole().name());
    }

    @Test
    void getBookmarks_Unauthenticated_ReturnsUnauthorized() throws Exception {
        mockMvc.perform(get("/api/v1/bookmarks"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void bookmarkLifecycle_AddListDelete_Success() throws Exception {
        UUID itemId = UUID.randomUUID();
        CreateBookmarkRequest createRequest = new CreateBookmarkRequest(
                "CASE_STUDY",
                itemId,
                "TinyURL System Design",
                "url-shortener"
        );

        // 1. Add Bookmark
        MvcResult addResult = mockMvc.perform(post("/api/v1/bookmarks")
                        .header("Authorization", "Bearer " + userToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.itemSlug").value("url-shortener"))
                .andReturn();

        String responseBody = addResult.getResponse().getContentAsString();
        String bookmarkId = objectMapper.readTree(responseBody).path("data").path("id").asText();

        // 2. Check Bookmark status
        mockMvc.perform(get("/api/v1/bookmarks/check?itemType=CASE_STUDY&itemId=" + itemId)
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.bookmarked").value(true));

        // 3. List Bookmarks
        mockMvc.perform(get("/api/v1/bookmarks")
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").isNumber());

        // 4. Delete Bookmark
        mockMvc.perform(delete("/api/v1/bookmarks/" + bookmarkId)
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isNoContent());

        // 5. Verify deleted
        mockMvc.perform(get("/api/v1/bookmarks/check?itemType=CASE_STUDY&itemId=" + itemId)
                        .header("Authorization", "Bearer " + userToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.bookmarked").value(false));
    }
}
