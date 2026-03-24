package online.binit.repository;

import online.binit.model.GameSession;
import online.binit.model.GameMode;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
 
import java.util.List;
import java.util.UUID;
 
/**
 * Handles persistence for Arcade mode game sessions only.
 * Apply mode scores are transient and never persisted.
 */
@Repository
public interface ScoreRepository extends JpaRepository<GameSession, UUID> {
    List<GameSession> findByUserId(UUID userId);
    List<GameSession> findByModeOrderByScoreDesc(GameMode mode, Pageable pageable);
}
