import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { scoreApi, type LeaderboardEntry } from "../api/api.score";
import { handleSignOut } from "../utils/utils.auth";
import "../app.css";

export default function ScoreScreen() {
  const { mode } = useParams();
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
          const data = await scoreApi.getLeaderboard(10);
          setLeaderboard(data);
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
        {mode === "arcade" ? (
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
        ) : (
          <div className="apply-container">
            <h2 className="apply-title">YOUR SCORE</h2>
            <div className="score-box">Score: 50 pts</div>
          </div>
        )}
      </main>

      <button onClick={handleSignOut} className="exit-container" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <span>Sign Out</span>
        <span className="exit-icon">🚪</span>
      </button>
    </div>
  );
}