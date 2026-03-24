package online.binit.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
 
@Entity
@Table(name = "progress")
public class Progress {
 
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
 
    @Column(name = "user_id", nullable = false)
    private UUID userId;
 
    @Column(name = "lesson_id", nullable = false)
    private UUID lessonId;
 
    @Column(name = "completed", nullable = false)
    private boolean completed;
 
    @Column(name = "completion_date")
    private LocalDateTime completionDate;
 
    public Progress() {}
 
    public Progress(UUID userId, UUID lessonId, boolean completed, LocalDateTime completionDate) {
        this.userId = userId;
        this.lessonId = lessonId;
        this.completed = completed;
        this.completionDate = completionDate;
    }
 
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
 
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }
 
    public UUID getLessonId() { return lessonId; }
    public void setLessonId(UUID lessonId) { this.lessonId = lessonId; }
 
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
 
    public LocalDateTime getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }
 
    @Override
    public String toString() {
        return "Progress{id=" + id + ", userId=" + userId + ", lessonId=" + lessonId + ", completed=" + completed + "}";
    }
}