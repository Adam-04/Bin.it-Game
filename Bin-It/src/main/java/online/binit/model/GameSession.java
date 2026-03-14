package online.binit.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Represents a completed game session.
 * Only ARCADE mode sessions are persisted via ScoreRepository.
 * APPLY mode sessions are transient and exist only for the duration of a request.
 */
@Entity
@Table(name = "game_sessions")
public class GameSession {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "mode", nullable = false)
    private GameMode mode;

    @Column(name = "score", nullable = false)
    private int score;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @PrePersist
    protected void onCreate() {
        this.startedAt = LocalDateTime.now();
    }

    public GameSession() {}

    public GameSession(UUID userId, GameMode mode, int score, LocalDateTime endedAt) {
        this.userId = userId;
        this.mode = mode;
        this.score = score;
        this.endedAt = endedAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public GameMode getMode() { return mode; }
    public void setMode(GameMode mode) { this.mode = mode; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getEndedAt() { return endedAt; }
    public void setEndedAt(LocalDateTime endedAt) { this.endedAt = endedAt; }

    @Override
    public String toString() {
        return "GameSession{id=" + id + ", userId=" + userId + ", mode=" + mode + ", score=" + score + "}";
    }
}