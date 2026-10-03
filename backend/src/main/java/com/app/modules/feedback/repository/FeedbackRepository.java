package com.app.modules.feedback.repository;

import com.app.modules.feedback.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, UUID> {
    List<Feedback> findByPageUrlOrderByCreatedAtDesc(String pageUrl);
    List<Feedback> findAllByOrderByCreatedAtDesc();
}
