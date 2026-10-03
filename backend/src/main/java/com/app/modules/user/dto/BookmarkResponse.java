package com.app.modules.user.dto;

import com.app.modules.user.entity.Bookmark;

import java.time.Instant;
import java.util.UUID;

public record BookmarkResponse(
        UUID id,
        UUID userId,
        String itemType,
        UUID itemId,
        String itemTitle,
        String itemSlug,
        Instant createdAt
) {
    public static BookmarkResponse fromEntity(Bookmark entity) {
        return new BookmarkResponse(
                entity.getId(),
                entity.getUserId(),
                entity.getItemType(),
                entity.getItemId(),
                entity.getItemTitle(),
                entity.getItemSlug(),
                entity.getCreatedAt()
        );
    }
}
