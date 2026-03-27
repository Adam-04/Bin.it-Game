package online.binit.controller;
 
import online.binit.model.Lesson;
import online.binit.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
import java.util.UUID;
 
@RestController
@RequestMapping("/lessons")
public class LessonController {
 
    private final LessonService lessonService;
 
    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }
 
    @GetMapping
    public ResponseEntity<List<Lesson>> getAllLessons() {
        return ResponseEntity.ok(lessonService.getAllLessons());
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable UUID id) {
        return ResponseEntity.ok(lessonService.getLessonById(id));
    }
}