package online.binit.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "lesson_order", nullable = false)
    private int lessonOrder;

    public Lesson() {}

    public Lesson(String title, String content, int lessonOrder) {
        this.title = title;
        this.content = content;
        this.lessonOrder = lessonOrder;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public int getLessonOrder() { return lessonOrder; }
    public void setLessonOrder(int lessonOrder) { this.lessonOrder = lessonOrder; }

    @Override
    public String toString() {
        return "Lesson{id=" + id + ", title='" + title + "', lessonOrder=" + lessonOrder + "}";
    }
}