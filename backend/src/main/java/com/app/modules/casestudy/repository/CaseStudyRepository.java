package com.app.modules.casestudy.repository;

import com.app.modules.casestudy.entity.CaseStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CaseStudyRepository extends JpaRepository<CaseStudy, UUID> {

    Optional<CaseStudy> findBySlugAndPublishedTrue(String slug);

    List<CaseStudy> findByPublishedTrueOrderByCreatedAtAsc();

    @Query("SELECT c FROM CaseStudy c WHERE c.published = true AND " +
           "(:category IS NULL OR LOWER(c.category) = LOWER(:category)) AND " +
           "(:difficulty IS NULL OR LOWER(c.difficulty) = LOWER(:difficulty)) AND " +
           "(:query IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.summary) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<CaseStudy> searchCaseStudies(
            @Param("category") String category,
            @Param("difficulty") String difficulty,
            @Param("query") String query
    );
}
