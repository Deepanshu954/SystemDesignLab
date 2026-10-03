package com.app.modules.feedback.entity;

import com.app.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "feedback")
public class Feedback extends BaseEntity {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "page_url", nullable = false)
    private String pageUrl;

    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "category", nullable = false, length = 64)
    private String category;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "status", nullable = false, length = 32)
    private String status = "NEW";

    public Feedback() {
    }

    public Feedback(UUID userId, String pageUrl, Integer rating, String category, String comment) {
        this.userId = userId;
        this.pageUrl = pageUrl;
        this.rating = rating;
        this.category = category;
        this.comment = comment;
        this.status = "NEW";
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getPageUrl() {
        return pageUrl;
    }

    public void setPageUrl(String pageUrl) {
        this.pageUrl = pageUrl;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
