package online.binit.dto;
 
import java.util.UUID;
 
public class AuthResponse {
 
    private UUID userId;
    private String username;
    private String token;
    private String message;
 
    public AuthResponse() {}
 
    public AuthResponse(UUID userId, String username, String token, String message) {
        this.userId = userId;
        this.username = username;
        this.token = token;
        this.message = message;
    }
 
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
 
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
 
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
 
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}