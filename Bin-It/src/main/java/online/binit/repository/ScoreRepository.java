package online.binit.repository;
 
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import online.binit.model.GameSession;
 
/**
 * Handles persistence for Arcade mode game sessions only.
 * Apply mode scores are transient and never persisted.
 */
@Repository
public interface ScoreRepository extends JpaRepository<GameSession, UUID> {
    List<GameSession> findByUserId(UUID userId);
 
    @Query("SELECT g FROM GameSession g ORDER BY g.score DESC")
    List<GameSession> findTopScores(Pageable pageable);
}
 
