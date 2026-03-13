import { useParams, Link } from "react-router";
//import {Leaderboard } from "~/components/Leaderboard";
import "./css/score.css"; // Importing score.css file

// ===== Will be modified to fetch real data from the backend ======
const mockData = [
  { rank: "01", name: "MIRIAM", score: "1050", isMe: false },
  { rank: "02", name: "ADAM", score: "980", isMe: false },
  { rank: "03", name: "PATRICIA", score: "760", isMe: true }, // Current User
  { rank: "04", name: "JOSH", score: "720", isMe: false },
  { rank: "05", name: "AARON", score: "680", isMe: false },
  { rank: "06", name: "MURTAAZ", score: "680", isMe: false }

];

// One ScoreScreen page aimed to handle the score screen for both the apply and arcade modes
export default function ScoreScreen() {
// Uses hook useParams to get the "mode" parameter from the URL,
  // which determines whether to show the arcade leaderboard or the apply score screen
  const { mode } = useParams();

  return (
    <div className="score-page">
        {/* Game Aesthetics - Background Particles */}
        <div className="nebula-container">
            <div className="blob blob-yellow"></div>
            <div className="blob blob-teal"></div>
        </div>

        <img src = "/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image"/>

        <main className="main-content">

        {mode === "arcade" ? (
            <div className="leaderboard-container">
            <h2 className="leaderboard-title">ARCADE LEADERBOARD</h2>
            
            { /* Loop through the data array */}
            {mockData.map((player) => (
                <div 
                key={player.rank} 
                /* If isMe is true, it adds the highlight class */
                className={`leaderboard-row ${player.isMe ? 'is-current-user' : ''}`}
                >
                <div className="rank-section">{player.rank}</div>
                <div className="username-section">{player.name}</div>
                <div className="score-section">{player.score}</div>
                </div>
            ))}
            </div>
        ) : (
            <div className="apply-container">
            {/* Apply Score*/}
            <h2 className = "apply-title">YOUR SCORE</h2>
            {/*===== Placeholder score, will be replaced with real score from the backend ======*/}
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
