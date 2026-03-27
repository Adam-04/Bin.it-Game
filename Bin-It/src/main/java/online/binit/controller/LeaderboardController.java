package online.binit.controller;
 
import online.binit.dto.LeaderboardEntry;
import online.binit.service.ScoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {
 
    private final ScoreService scoreService;
 
    public LeaderboardController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }
 
    @GetMapping
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard(
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(scoreService.getTopScores(limit));
    }
}
 