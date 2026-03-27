package online.binit.dto;
 
import java.util.UUID;
 
public class LeaderboardEntry {
 
    private int rank;
    private UUID userId;
    private String username;
    private int score;
 
    public LeaderboardEntry() {}
 
    public LeaderboardEntry(int rank, UUID userId, String username, int score) {
        this.rank = rank;
        this.userId = userId;
        this.username = username;
        this.score = score;
    }
 
    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }
 
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
 
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
 
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
 