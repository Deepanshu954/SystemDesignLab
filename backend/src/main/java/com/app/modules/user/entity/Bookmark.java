package com.app.modules.user.entity;

import com.app.common.base.BaseEntity;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "bookmarks", uniqueConstraints = {
        @UniqueConstraint(name = "uq_user_bookmark", columnNames = {"user_id", "item_type", "item_id"})
})
public class Bookmark extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "item_type", nullable = false, length = 32)
    private String itemType;

    @Column(name = "item_id", nullable = false)
    private UUID itemId;

    @Column(name = "item_title", nullable = false)
    private String itemTitle;

    @Column(name = "item_slug", nullable = false, length = 120)
    private String itemSlug;

    public Bookmark() {
    }

    public Bookmark(UUID userId, String itemType, UUID itemId, String itemTitle, String itemSlug) {
        this.userId = userId;
        this.itemType = itemType;
        this.itemId = itemId;
        this.itemTitle = itemTitle;
        this.itemSlug = itemSlug;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public UUID getItemId() {
        return itemId;
    }

    public void setItemId(UUID itemId) {
        this.itemId = itemId;
    }

    public String getItemTitle() {
        return itemTitle;
    }

    public void setItemTitle(String itemTitle) {
        this.itemTitle = itemTitle;
    }

    public String getItemSlug() {
        return itemSlug;
    }

    public void setItemSlug(String itemSlug) {
        this.itemSlug = itemSlug;
    }
}
