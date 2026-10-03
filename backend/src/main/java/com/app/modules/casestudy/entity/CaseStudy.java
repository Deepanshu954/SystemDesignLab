package com.app.modules.casestudy.entity;

import com.app.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "case_studies")
public class CaseStudy extends BaseEntity {

    @Column(name = "slug", nullable = false, unique = true, length = 120)
    private String slug;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "summary", nullable = false, length = 500)
    private String summary;

    @Column(name = "difficulty", nullable = false, length = 32)
    private String difficulty;

    @Column(name = "category", nullable = false, length = 64)
    private String category;

    @Column(name = "reading_time_minutes", nullable = false)
    private Integer readingTimeMinutes = 15;

    @Column(name = "architecture_diagram_json", columnDefinition = "TEXT")
    private String architectureDiagramJson;

    @Column(name = "capacity_math_json", columnDefinition = "TEXT")
    private String capacityMathJson;

    @Column(name = "full_content_markdown", nullable = false, columnDefinition = "TEXT")
    private String fullContentMarkdown;

    @Column(name = "published", nullable = false)
    private Boolean published = true;

    public CaseStudy() {
    }

    public CaseStudy(String slug, String title, String summary, String difficulty, String category,
                     Integer readingTimeMinutes, String architectureDiagramJson, String capacityMathJson,
                     String fullContentMarkdown, Boolean published) {
        this.slug = slug;
        this.title = title;
        this.summary = summary;
        this.difficulty = difficulty;
        this.category = category;
        this.readingTimeMinutes = readingTimeMinutes;
        this.architectureDiagramJson = architectureDiagramJson;
        this.capacityMathJson = capacityMathJson;
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

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getReadingTimeMinutes() {
        return readingTimeMinutes;
    }

    public void setReadingTimeMinutes(Integer readingTimeMinutes) {
        this.readingTimeMinutes = readingTimeMinutes;
    }

    public String getArchitectureDiagramJson() {
        return architectureDiagramJson;
    }

    public void setArchitectureDiagramJson(String architectureDiagramJson) {
        this.architectureDiagramJson = architectureDiagramJson;
    }

    public String getCapacityMathJson() {
        return capacityMathJson;
    }

    public void setCapacityMathJson(String capacityMathJson) {
        this.capacityMathJson = capacityMathJson;
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
