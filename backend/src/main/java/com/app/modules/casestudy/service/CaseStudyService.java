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
        List<CaseStudy> list;
        if (category != null || difficulty != null || query != null) {
            list = caseStudyRepository.searchCaseStudies(category, difficulty, query);
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
