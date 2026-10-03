package com.app.modules.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CreateBookmarkRequest(
        @NotBlank(message = "Item type is required")
        String itemType,

        @NotNull(message = "Item ID is required")
        UUID itemId,

        @NotBlank(message = "Item title is required")
        String itemTitle,

        @NotBlank(message = "Item slug is required")
        String itemSlug
) {
}
