package online.binit.service;
 
import online.binit.model.Progress;
import online.binit.repository.ProgressRepository;
import org.springframework.stereotype.Service;
 
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
 
@Service
public class ProgressService {
 
    private final ProgressRepository progressRepository;
 
    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }
 
    public List<Progress> getProgressByUser(UUID userId) {
        return progressRepository.findByUserId(userId);
    }
 
    public List<Progress> getCompletedByUser(UUID userId) {
        return progressRepository.findByUserIdAndCompleted(userId, true);
    }
 
    public Progress markLessonComplete(UUID userId, UUID lessonId) {
        Progress progress = progressRepository
                .findByUserIdAndLessonId(userId, lessonId)
                .orElse(new Progress(userId, lessonId, false, null));
 
        if (!progress.isCompleted()) {
            progress.setCompleted(true);
            progress.setCompletionDate(LocalDateTime.now());
            progressRepository.save(progress);
        }
 
        return progress;
    }
}