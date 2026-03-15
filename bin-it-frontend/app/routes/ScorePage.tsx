import { useParams, Link } from "react-router";
import "../app.css";

const mockData = [
  { rank: "01", name: "MIRIAM", score: "1050", isMe: false },
  { rank: "02", name: "ADAM", score: "980", isMe: false },
  { rank: "03", name: "PATRICIA", score: "760", isMe: true },
  { rank: "04", name: "JOSH", score: "720", isMe: false },
  { rank: "05", name: "AARON", score: "680", isMe: false },
  { rank: "06", name: "MURTAAZ", score: "680", isMe: false }
];

export default function ScoreScreen() {
  const { mode } = useParams();

  return (
    <div className="page-container">
      {/* shared background blobs */}
      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      {/* shared logo */}
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      <main style={{ width: "100%", zIndex: 5 }}>
        {mode === "arcade" ? (
          <div className="leaderboard-container auth-card">
            <h2 className="leaderboard-title">ARCADE LEADERBOARD</h2>
            {mockData.map((player) => (
              <div
                key={player.rank}
                className={`leaderboard-row ${player.isMe ? "is-current-user" : ""}`}
              >
                <div className="rank-section">{player.rank}</div>
                <div className="username-section">{player.name}</div>
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

      <Link to="/" className="exit-container">
        <span>Sign Out</span>
        <span className="exit-icon">🚪</span>
      </Link>
    </div>
  );
}