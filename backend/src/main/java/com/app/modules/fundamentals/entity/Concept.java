package com.app.modules.fundamentals.entity;

import com.app.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "concepts")
public class Concept extends BaseEntity {

    @Column(name = "slug", nullable = false, unique = true, length = 120)
    private String slug;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "summary", nullable = false, length = 500)
    private String summary;

    @Column(name = "category", nullable = false, length = 64)
    private String category;

    @Column(name = "difficulty", nullable = false, length = 32)
    private String difficulty;

    @Column(name = "reading_time_minutes", nullable = false)
    private Integer readingTimeMinutes = 10;

    @Column(name = "key_takeaways_json", columnDefinition = "TEXT")
    private String keyTakeawaysJson;

    @Column(name = "full_content_markdown", nullable = false, columnDefinition = "TEXT")
    private String fullContentMarkdown;

    @Column(name = "published", nullable = false)
    private Boolean published = true;

    public Concept() {
    }

    public Concept(String slug, String title, String summary, String category, String difficulty,
                   Integer readingTimeMinutes, String keyTakeawaysJson, String fullContentMarkdown, Boolean published) {
        this.slug = slug;
        this.title = title;
        this.summary = summary;
        this.category = category;
        this.difficulty = difficulty;
        this.readingTimeMinutes = readingTimeMinutes;
        this.keyTakeawaysJson = keyTakeawaysJson;
        this.fullContentMarkdown = fullContentMarkdown;
        this.published = published != null ? published : true;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getReadingTimeMinutes() {
        return readingTimeMinutes;
    }

    public void setReadingTimeMinutes(Integer readingTimeMinutes) {
        this.readingTimeMinutes = readingTimeMinutes;
    }

    public String getKeyTakeawaysJson() {
        return keyTakeawaysJson;
    }

    public void setKeyTakeawaysJson(String keyTakeawaysJson) {
        this.keyTakeawaysJson = keyTakeawaysJson;
    }

    public String getFullContentMarkdown() {
        return fullContentMarkdown;
    }

    public void setFullContentMarkdown(String fullContentMarkdown) {
        this.fullContentMarkdown = fullContentMarkdown;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }
}
