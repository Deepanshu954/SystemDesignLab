package com.app.modules.interview.entity;

import com.app.common.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "interview_questions")
public class InterviewQuestion extends BaseEntity {

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "category", nullable = false, length = 64)
    private String category;

    @Column(name = "difficulty", nullable = false, length = 32)
    private String difficulty;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Column(name = "answer_guide", nullable = false, columnDefinition = "TEXT")
    private String answerGuide;

    @Column(name = "key_points_json", columnDefinition = "TEXT")
    private String keyPointsJson;

    @Column(name = "published", nullable = false)
    private Boolean published = true;

    public InterviewQuestion() {
    }

    public InterviewQuestion(String title, String category, String difficulty, String questionText,
                             String answerGuide, String keyPointsJson, Boolean published) {
        this.title = title;
        this.category = category;
        this.difficulty = difficulty;
        this.questionText = questionText;
        this.answerGuide = answerGuide;
        this.keyPointsJson = keyPointsJson;
        this.published = published != null ? published : true;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getAnswerGuide() {
        return answerGuide;
    }

    public void setAnswerGuide(String answerGuide) {
        this.answerGuide = answerGuide;
    }

    public String getKeyPointsJson() {
        return keyPointsJson;
    }

    public void setKeyPointsJson(String keyPointsJson) {
        this.keyPointsJson = keyPointsJson;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }
}
