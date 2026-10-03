package com.app.modules.interview.repository;

import com.app.modules.interview.entity.InterviewQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InterviewQuestionRepository extends JpaRepository<InterviewQuestion, UUID> {

    List<InterviewQuestion> findByPublishedTrueOrderByCreatedAtAsc();

    Optional<InterviewQuestion> findByIdAndPublishedTrue(UUID id);

    @Query("SELECT q FROM InterviewQuestion q WHERE q.published = true AND " +
           "(:category IS NULL OR LOWER(q.category) = LOWER(:category)) AND " +
           "(:difficulty IS NULL OR LOWER(q.difficulty) = LOWER(:difficulty)) AND " +
           "(:query IS NULL OR LOWER(q.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(q.questionText) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<InterviewQuestion> searchQuestions(
            @Param("category") String category,
            @Param("difficulty") String difficulty,
            @Param("query") String query
    );
}
