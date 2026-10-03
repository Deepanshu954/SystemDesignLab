package com.app.modules.fundamentals.repository;

import com.app.modules.fundamentals.entity.Concept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ConceptRepository extends JpaRepository<Concept, UUID> {

    Optional<Concept> findBySlugAndPublishedTrue(String slug);

    List<Concept> findByPublishedTrueOrderByCreatedAtAsc();

    @Query("SELECT c FROM Concept c WHERE c.published = true AND " +
           "(:category IS NULL OR LOWER(c.category) = LOWER(:category)) AND " +
           "(:query IS NULL OR LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.summary) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Concept> searchConcepts(
            @Param("category") String category,
            @Param("query") String query
    );
}
