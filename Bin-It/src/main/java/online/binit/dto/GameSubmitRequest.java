package online.binit.dto;
 
import java.util.UUID;
 
public class GameSubmitRequest {
 
    private UUID userId;
    private int score;
 
    public GameSubmitRequest() {}
 
    public GameSubmitRequest(UUID userId, int score) {
        this.userId = userId;
        this.score = score;
    }
 
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
 
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
 