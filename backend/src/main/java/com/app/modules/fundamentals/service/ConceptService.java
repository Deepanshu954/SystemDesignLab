package com.app.modules.fundamentals.service;

import com.app.common.exception.ResourceNotFoundException;
import com.app.modules.fundamentals.dto.ConceptDetailResponse;
import com.app.modules.fundamentals.dto.ConceptSummaryResponse;
import com.app.modules.fundamentals.entity.Concept;
import com.app.modules.fundamentals.repository.ConceptRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ConceptService {

    private final ConceptRepository conceptRepository;

    public ConceptService(ConceptRepository conceptRepository) {
        this.conceptRepository = conceptRepository;
    }

    public List<ConceptSummaryResponse> getConcepts(String category, String query) {
        List<Concept> list;
        if (category != null || query != null) {
            list = conceptRepository.searchConcepts(category, query);
        } else {
            list = conceptRepository.findByPublishedTrueOrderByCreatedAtAsc();
        }
        return list.stream()
                .map(ConceptSummaryResponse::fromEntity)
                .toList();
    }

    public ConceptDetailResponse getConceptBySlug(String slug) {
        Concept concept = conceptRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Concept", "slug", slug));
        return ConceptDetailResponse.fromEntity(concept);
    }
}
