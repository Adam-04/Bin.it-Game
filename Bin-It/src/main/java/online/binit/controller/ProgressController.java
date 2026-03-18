package online.binit.controller;
 
import online.binit.model.Progress;
import online.binit.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
import java.util.UUID;
 
@RestController
@RequestMapping("/progress")
public class ProgressController {
 
    private final ProgressService progressService;
 
    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }
 
    @GetMapping("/{userId}")
    public ResponseEntity<List<Progress>> getProgress(@PathVariable UUID userId) {
        return ResponseEntity.ok(progressService.getProgressByUser(userId));
    }
 
    @GetMapping("/{userId}/completed")
    public ResponseEntity<List<Progress>> getCompleted(@PathVariable UUID userId) {
        return ResponseEntity.ok(progressService.getCompletedByUser(userId));
    }
 
    @PostMapping("/{userId}/complete/{lessonId}")
    public ResponseEntity<Progress> markComplete(@PathVariable UUID userId,
                                                  @PathVariable UUID lessonId) {
        return ResponseEntity.ok(progressService.markLessonComplete(userId, lessonId));
    }
}