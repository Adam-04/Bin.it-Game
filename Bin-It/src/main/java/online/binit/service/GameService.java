package online.binit.service;
 
import online.binit.dto.GameResultResponse;
import online.binit.dto.GameSubmitRequest;
import online.binit.model.GameSession;
import online.binit.repository.ScoreRepository;
import org.springframework.stereotype.Service;
 
import java.time.LocalDateTime;
 
@Service
public class GameService {
 
    private final ScoreRepository scoreRepository;
 
    public GameService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }
 
    /**
     * Apply mode - score is calculated and returned but never persisted.
     */
    public GameResultResponse submitApplyScore(GameSubmitRequest request) {
        return new GameResultResponse(null, request.getScore(), "Apply game complete.");
    }
 
    /**
     * Arcade mode - score is calculated and saved to the leaderboard.
     */
    public GameResultResponse submitArcadeScore(GameSubmitRequest request) {
        GameSession session = new GameSession(
                request.getUserId(),
                request.getScore(),
                LocalDateTime.now()
        );
 
        scoreRepository.save(session);
 
        return new GameResultResponse(session.getId(), session.getScore(), "Arcade game complete. Score saved.");
    }
}
 