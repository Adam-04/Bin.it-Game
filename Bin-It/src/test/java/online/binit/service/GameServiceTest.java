package online.binit.service;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import online.binit.dto.GameResultResponse;
import online.binit.dto.GameSubmitRequest;
import online.binit.model.GameSession;
import online.binit.repository.ScoreRepository;

@ExtendWith(MockitoExtension.class)
class GameServiceTest {

    @Mock
    private ScoreRepository scoreRepository;

    @InjectMocks
    private GameService gameService;

    @Test
    void testSubmitApplyScore() {
        GameSubmitRequest request = new GameSubmitRequest();
        request.setScore(120);

        GameResultResponse response = gameService.submitApplyScore(request);

        assertNull(response.getSessionId());
        assertEquals(120, response.getScore());
        assertEquals("Apply game complete.", response.getMessage());

        verify(scoreRepository, never()).save(any());
    }

    @Test
    void testSubmitArcadeScore() {
        UUID userId = UUID.randomUUID();

        GameSubmitRequest request = new GameSubmitRequest();
        request.setUserId(userId);
        request.setScore(250);

        UUID sessionId = UUID.randomUUID();
        GameSession savedSession = new GameSession(userId, 250, null);
        savedSession.setId(sessionId);

        when(scoreRepository.save(any(GameSession.class))).thenReturn(savedSession);

        GameResultResponse response = gameService.submitArcadeScore(request);

        assertEquals(250, response.getScore());
        assertEquals("Arcade game complete. Score saved.", response.getMessage());

        verify(scoreRepository).save(any(GameSession.class));
    }
}
