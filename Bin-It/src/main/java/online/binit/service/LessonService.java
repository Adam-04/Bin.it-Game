package online.binit.service;
 
import online.binit.model.Lesson;
import online.binit.repository.LessonRepository;
import org.springframework.stereotype.Service;
 
import java.util.List;
import java.util.UUID;
 
@Service
public class LessonService {
 
    private final LessonRepository lessonRepository;
 
    public LessonService(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
 
    public List<Lesson> getAllLessons() {
        return lessonRepository.findAllByOrderByLessonOrderAsc();
    }
 
    public Lesson getLessonById(UUID id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Lesson not found."));
    }
}
 