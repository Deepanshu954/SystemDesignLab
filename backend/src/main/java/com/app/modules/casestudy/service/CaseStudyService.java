package com.app.modules.casestudy.service;

import com.app.common.exception.ResourceNotFoundException;
import com.app.modules.casestudy.dto.CaseStudyDetailResponse;
import com.app.modules.casestudy.dto.CaseStudySummaryResponse;
import com.app.modules.casestudy.entity.CaseStudy;
import com.app.modules.casestudy.repository.CaseStudyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class CaseStudyService {

    private final CaseStudyRepository caseStudyRepository;

    public CaseStudyService(CaseStudyRepository caseStudyRepository) {
        this.caseStudyRepository = caseStudyRepository;
    }

    public List<CaseStudySummaryResponse> getCaseStudies(String category, String difficulty, String query) {
        String cleanCategory = (category != null && !category.isBlank()) ? category.trim() : null;
        String cleanDifficulty = (difficulty != null && !difficulty.isBlank()) ? difficulty.trim() : null;
        String cleanQuery = (query != null && !query.isBlank()) ? query.trim() : null;

        List<CaseStudy> list;
        if (cleanCategory != null || cleanDifficulty != null || cleanQuery != null) {
            list = caseStudyRepository.searchCaseStudies(cleanCategory, cleanDifficulty, cleanQuery);
        } else {
            list = caseStudyRepository.findByPublishedTrueOrderByCreatedAtAsc();
        }
        return list.stream()
                .map(CaseStudySummaryResponse::fromEntity)
                .toList();
    }

    public CaseStudyDetailResponse getCaseStudyBySlug(String slug) {
        CaseStudy caseStudy = caseStudyRepository.findBySlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("CaseStudy", "slug", slug));
        return CaseStudyDetailResponse.fromEntity(caseStudy);
    }
}
