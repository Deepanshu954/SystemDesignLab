package com.app.modules.user.service;

import com.app.common.exception.ResourceNotFoundException;
import com.app.modules.user.dto.BookmarkResponse;
import com.app.modules.user.dto.CreateBookmarkRequest;
import com.app.modules.user.entity.Bookmark;
import com.app.modules.user.repository.BookmarkRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    public BookmarkService(BookmarkRepository bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }

    public List<BookmarkResponse> getBookmarksForUser(UUID userId) {
        return bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(BookmarkResponse::fromEntity)
                .toList();
    }

    @Transactional(rollbackFor = Exception.class)
    public BookmarkResponse addBookmark(UUID userId, CreateBookmarkRequest request) {
        Optional<Bookmark> existing = bookmarkRepository.findByUserIdAndItemTypeAndItemId(
                userId, request.itemType(), request.itemId()
        );
        if (existing.isPresent()) {
            return BookmarkResponse.fromEntity(existing.get());
        }

        Bookmark bookmark = new Bookmark(
                userId,
                request.itemType(),
                request.itemId(),
                request.itemTitle(),
                request.itemSlug()
        );
        Bookmark saved = bookmarkRepository.save(bookmark);
        return BookmarkResponse.fromEntity(saved);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removeBookmark(UUID userId, UUID bookmarkId) {
        Bookmark bookmark = bookmarkRepository.findByIdAndUserId(bookmarkId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Bookmark", "id", bookmarkId));
        bookmarkRepository.delete(bookmark);
    }

    public boolean isBookmarked(UUID userId, String itemType, UUID itemId) {
        return bookmarkRepository.existsByUserIdAndItemTypeAndItemId(userId, itemType, itemId);
    }
}
