package online.binit.service;

import online.binit.dto.LeaderboardEntry;
import online.binit.model.GameSession;
import online.binit.model.UserDetail;
import online.binit.repository.ScoreRepository;
import online.binit.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
 
import java.util.ArrayList;
import java.util.List;
 
@Service
public class ScoreService {
 
    private final ScoreRepository scoreRepository;
    private final UserRepository userRepository;
 
    public ScoreService(ScoreRepository scoreRepository, UserRepository userRepository) {
        this.scoreRepository = scoreRepository;
        this.userRepository = userRepository;
    }
 
    public List<LeaderboardEntry> getTopScores(int limit) {
        List<GameSession> sessions = scoreRepository.findTopScores(PageRequest.of(0, limit));
        List<LeaderboardEntry> leaderboard = new ArrayList<>();
 
        for (int i = 0; i < sessions.size(); i++) {
            GameSession session = sessions.get(i);
            String username = userRepository.findById(session.getUserId())
                    .map(UserDetail::getUsername)
                    .orElse("Unknown");
 
            leaderboard.add(new LeaderboardEntry(i + 1, session.getUserId(), username, session.getScore()));
        }
 
        return leaderboard;
    }
}