package com.app.modules.user.controller;

import com.app.common.base.ApiResponse;
import com.app.common.security.UserPrincipal;
import com.app.modules.user.dto.BookmarkResponse;
import com.app.modules.user.dto.CreateBookmarkRequest;
import com.app.modules.user.service.BookmarkService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/bookmarks")
@Tag(name = "Bookmarks", description = "User saved articles, case studies, and interview topics")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }

    @GetMapping
    @Operation(summary = "List all bookmarks for the authenticated user")
    public ResponseEntity<ApiResponse<List<BookmarkResponse>>> getBookmarks(
            @AuthenticationPrincipal UserPrincipal principal) {
        List<BookmarkResponse> response = bookmarkService.getBookmarksForUser(principal.getId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping
    @Operation(summary = "Save a bookmark for the authenticated user")
    public ResponseEntity<ApiResponse<BookmarkResponse>> addBookmark(
            @AuthenticationPrincipal UserPrincipal principal,
            @Valid @RequestBody CreateBookmarkRequest request) {
        BookmarkResponse response = bookmarkService.addBookmark(principal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.created("Bookmark saved", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Remove a bookmark")
    public ResponseEntity<Void> removeBookmark(
            @AuthenticationPrincipal UserPrincipal principal,
            @PathVariable UUID id) {
        bookmarkService.removeBookmark(principal.getId(), id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check")
    @Operation(summary = "Check if an item is bookmarked by the authenticated user")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkBookmark(
            @AuthenticationPrincipal UserPrincipal principal,
            @RequestParam String itemType,
            @RequestParam UUID itemId) {
        boolean bookmarked = bookmarkService.isBookmarked(principal.getId(), itemType, itemId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("bookmarked", bookmarked)));
    }
}
