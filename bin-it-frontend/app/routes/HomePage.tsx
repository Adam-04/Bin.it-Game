import { useNavigate } from "react-router";
import { handleSignOut } from "../utils/utils.auth"; // Import your utility
import "../app.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      {/* Uses handleSignOut utility to clear tokens*/}
      <button 
        onClick={handleSignOut} 
        className="exit-container" 
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span>Sign Out</span>
        <span className="exit-icon">🚪</span>
      </button>

      <main className="auth-card">
        <h1 className="auth-title">BIN-IT</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%", marginTop: "10px" }}>
          <button className="action-button" onClick={() => navigate("/lessons")}>LEARN</button>
          <button className="action-button" onClick={() => navigate("/apply")}>APPLY</button>
          <button className="action-button" onClick={() => navigate("/game")}>ARCADE</button>
          <button className="action-button" onClick={() => navigate("/score/arcade")}>LEADERBOARD</button>
        </div>

        <p className="redirect-text" style={{ marginTop: "20px" }}>
          Ready to sort some waste?
        </p>
      </main>
    </div>
  );
}