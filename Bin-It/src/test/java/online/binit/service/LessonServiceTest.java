package online.binit.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import online.binit.model.Lesson;
import online.binit.repository.LessonRepository;

@ExtendWith(MockitoExtension.class)
class LessonServiceTest {

    @Mock
    private LessonRepository lessonRepository;

    @InjectMocks
    private LessonService lessonService;

    @Test
    void testGetAllLessons() {
        Lesson lesson1 = new Lesson();
        Lesson lesson2 = new Lesson();

        List<Lesson> lessons = List.of(lesson1, lesson2);

        when(lessonRepository.findAllByOrderByLessonOrderAsc()).thenReturn(lessons);

        List<Lesson> result = lessonService.getAllLessons();

        assertEquals(2, result.size());
    }

    @Test
    void testGetLessonByIdSuccess() {
        UUID lessonId = UUID.randomUUID();

        Lesson lesson = new Lesson();
        lesson.setId(lessonId);

        when(lessonRepository.findById(lessonId)).thenReturn(Optional.of(lesson));

        Lesson result = lessonService.getLessonById(lessonId);

        assertEquals(lessonId, result.getId());
    }

    @Test
    void testGetLessonByIdNotFound() {
        UUID lessonId = UUID.randomUUID();

        when(lessonRepository.findById(lessonId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> {
            lessonService.getLessonById(lessonId);
        });
    }
}