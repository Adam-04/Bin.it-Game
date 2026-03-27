import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { scoreApi, type LeaderboardEntry } from "../api/api.score";
import "../app.css";

export default function ScoreScreen() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve the ID we saved during login
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setCurrentUserId(storedId);

    if (mode === "arcade") {
      const loadData = async () => {
        try {
          setIsLoading(true);
          const rawData = await scoreApi.getLeaderboard(20);

          // Create a map to store only the highest score per user.
          const uniqueScoresMap = new Map<string, LeaderboardEntry>();

          rawData.forEach((entry) => {
            const existingEntry = uniqueScoresMap.get(entry.userId);
            if (!existingEntry || entry.score > existingEntry.score) {
              uniqueScoresMap.set(entry.userId, entry);
            }
          });

          // Convert map back to array and sort by score descending, and 
          // only take the top 10 scores.
          const sortedUniqueData = Array.from(uniqueScoresMap.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            // Add rank based on sorted order
            .map((entry, index) => ({ ...entry, rank: index + 1 })); 

          setLeaderboard(sortedUniqueData);
        } catch (err) {
          setError("Failed to load leaderboard.");
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [mode]);

  return (
    <div className="page-container">
      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      <main style={{ width: "100%", zIndex: 5 }}>
        <div className="leaderboard-container auth-card">
          <h2 className="leaderboard-title">ARCADE LEADERBOARD</h2>
          
          {isLoading && <p style={{textAlign: "center", color: "white"}}>Loading...</p>}
          {error && <p style={{textAlign: "center", color: "red"}}>{error}</p>}

          {!isLoading && !error && leaderboard.map((player) => (
            <div
              key={player.userId}
              /* Comparison check for the green highlight */
              className={`leaderboard-row ${player.userId === currentUserId ? "is-current-user" : ""}`}
            >
              <div className="rank-section">{String(player.rank).padStart(2, '0')}</div>
              <div className="username-section">{player.username.toUpperCase()}</div>
              <div className="score-section">{player.score}</div>
            </div>
          ))}
        </div>
      </main>

      <button onClick={() => navigate("/homepage")} className="exit-container" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <span>HOMEPAGE</span>
        <span className="exit-icon">🚪</span>
      </button>
    </div>
  );
}