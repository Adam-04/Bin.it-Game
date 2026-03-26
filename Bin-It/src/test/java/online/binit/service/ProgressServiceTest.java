package online.binit.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import online.binit.model.Progress;
import online.binit.repository.ProgressRepository;

@ExtendWith(MockitoExtension.class)
class ProgressServiceTest {

    @Mock
    private ProgressRepository progressRepository;

    @InjectMocks
    private ProgressService progressService;

    @Test
    void testGetProgressByUser() {
        UUID userId = UUID.randomUUID();

        List<Progress> progressList = List.of(
            new Progress(userId, UUID.randomUUID(), true, LocalDateTime.now()),
            new Progress(userId, UUID.randomUUID(), false, null)
        );

        when(progressRepository.findByUserId(userId)).thenReturn(progressList);

        List<Progress> result = progressService.getProgressByUser(userId);

        assertEquals(2, result.size());
    }

    @Test
    void testGetCompletedByUser() {
        UUID userId = UUID.randomUUID();

        List<Progress> completedList = List.of(
            new Progress(userId, UUID.randomUUID(), true, LocalDateTime.now())
        );

        when(progressRepository.findByUserIdAndCompleted(userId, true)).thenReturn(completedList);

        List<Progress> result = progressService.getCompletedByUser(userId);

        assertEquals(1, result.size());
        assertTrue(result.get(0).isCompleted());
    }

    @Test
    void testMarkLessonCompleteWhenNotAlreadyCompleted() {
        UUID userId = UUID.randomUUID();
        UUID lessonId = UUID.randomUUID();

        when(progressRepository.findByUserIdAndLessonId(userId, lessonId))
            .thenReturn(Optional.empty());

        Progress result = progressService.markLessonComplete(userId, lessonId);

        assertTrue(result.isCompleted());
        verify(progressRepository).save(any(Progress.class));
    }

    @Test
    void testMarkLessonCompleteWhenAlreadyCompleted() {
        UUID userId = UUID.randomUUID();
        UUID lessonId = UUID.randomUUID();

        Progress existingProgress = new Progress(userId, lessonId, true, LocalDateTime.now());

        when(progressRepository.findByUserIdAndLessonId(userId, lessonId))
            .thenReturn(Optional.of(existingProgress));

        Progress result = progressService.markLessonComplete(userId, lessonId);

        assertTrue(result.isCompleted());
        verify(progressRepository, never()).save(any(Progress.class));
    }
}