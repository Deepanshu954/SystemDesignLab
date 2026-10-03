package com.app.modules.user.repository;

import com.app.modules.user.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, UUID> {

    List<Bookmark> findByUserIdOrderByCreatedAtDesc(UUID userId);

    Optional<Bookmark> findByUserIdAndItemTypeAndItemId(UUID userId, String itemType, UUID itemId);

    boolean existsByUserIdAndItemTypeAndItemId(UUID userId, String itemType, UUID itemId);

    Optional<Bookmark> findByIdAndUserId(UUID id, UUID userId);
}
