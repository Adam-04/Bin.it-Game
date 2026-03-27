package online.binit.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import online.binit.dto.LeaderboardEntry;
import online.binit.model.GameSession;
import online.binit.model.UserDetail;
import online.binit.repository.ScoreRepository;
import online.binit.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class ScoreServiceTest {

    @Mock
    private ScoreRepository scoreRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ScoreService scoreService;

    @Test
    void testGetTopScoresSuccess() {
        UUID userId1 = UUID.randomUUID();
        UUID userId2 = UUID.randomUUID();

        GameSession session1 = new GameSession(userId1, 150, LocalDateTime.now());
        GameSession session2 = new GameSession(userId2, 100, LocalDateTime.now());

        List<GameSession> sessions = List.of(session1, session2);

        UserDetail user1 = new UserDetail();
        user1.setId(userId1);
        user1.setUsername("murtaaz");

        UserDetail user2 = new UserDetail();
        user2.setId(userId2);
        user2.setUsername("alex");

        when(scoreRepository.findTopScores(any())).thenReturn(sessions);
        when(userRepository.findById(userId1)).thenReturn(Optional.of(user1));
        when(userRepository.findById(userId2)).thenReturn(Optional.of(user2));

        List<LeaderboardEntry> result = scoreService.getTopScores(2);

        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getRank());
        assertEquals("murtaaz", result.get(0).getUsername());
        assertEquals(150, result.get(0).getScore());

        assertEquals(2, result.get(1).getRank());
        assertEquals("alex", result.get(1).getUsername());
        assertEquals(100, result.get(1).getScore());
    }

    @Test
    void testGetTopScoresUserNotFound() {
        UUID userId = UUID.randomUUID();

        GameSession session = new GameSession(userId, 200, LocalDateTime.now());
        List<GameSession> sessions = List.of(session);

        when(scoreRepository.findTopScores(any())).thenReturn(sessions);
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        List<LeaderboardEntry> result = scoreService.getTopScores(1);

        assertEquals(1, result.size());
        assertEquals(1, result.get(0).getRank());
        assertEquals("Unknown", result.get(0).getUsername());
        assertEquals(200, result.get(0).getScore());
    }
}