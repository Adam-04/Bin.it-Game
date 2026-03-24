package online.binit.dto;
 
import java.util.UUID;
 
public class GameResultResponse {
 
    private UUID sessionId;
    private int score;
    private String message;
 
    public GameResultResponse() {}
 
    public GameResultResponse(UUID sessionId, int score, String message) {
        this.sessionId = sessionId;
        this.score = score;
        this.message = message;
    }
 
    public UUID getSessionId() { return sessionId; }
    public void setSessionId(UUID sessionId) { this.sessionId = sessionId; }
 
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
 
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
 