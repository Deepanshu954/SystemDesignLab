package com.app.modules.interview.service;

import com.app.common.exception.ResourceNotFoundException;
import com.app.modules.interview.dto.InterviewQuestionResponse;
import com.app.modules.interview.entity.InterviewQuestion;
import com.app.modules.interview.repository.InterviewQuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class InterviewQuestionService {

    private final InterviewQuestionRepository repository;

    public InterviewQuestionService(InterviewQuestionRepository repository) {
        this.repository = repository;
    }

    public List<InterviewQuestionResponse> getQuestions(String category, String difficulty, String query) {
        List<InterviewQuestion> list;
        if (category != null || difficulty != null || query != null) {
            list = repository.searchQuestions(category, difficulty, query);
        } else {
            list = repository.findByPublishedTrueOrderByCreatedAtAsc();
        }
        return list.stream()
                .map(InterviewQuestionResponse::fromEntity)
                .toList();
    }

    public InterviewQuestionResponse getQuestionById(UUID id) {
        InterviewQuestion question = repository.findByIdAndPublishedTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("InterviewQuestion", "id", id));
        return InterviewQuestionResponse.fromEntity(question);
    }
}
