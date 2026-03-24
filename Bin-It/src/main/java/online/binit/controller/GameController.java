package online.binit.controller;
 
import online.binit.dto.GameResultResponse;
import online.binit.dto.GameSubmitRequest;
import online.binit.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/game")
public class GameController {
 
    private final GameService gameService;
 
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }
 
    /**
     * Apply mode - returns score without saving.
     */
    @PostMapping("/apply/submit")
    public ResponseEntity<GameResultResponse> submitApply(@RequestBody GameSubmitRequest request) {
        return ResponseEntity.ok(gameService.submitApplyScore(request));
    }
 
    /**
     * Arcade mode - saves score to leaderboard.
     */
    @PostMapping("/arcade/submit")
    public ResponseEntity<GameResultResponse> submitArcade(@RequestBody GameSubmitRequest request) {
        return ResponseEntity.ok(gameService.submitArcadeScore(request));
    }
}
 
