import { useNavigate } from "react-router";
import "../app.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container welcome-trigger" onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>
      <div className="welcome-layout">
        <img src="/Gemini-Logo.png" alt="BinIt Logo" className="welcome-logo" />
        
        <div className="welcome-text-overlay">
          <h1 className="welcome-title">WELCOME TO BIN-IT</h1>
          <p className="click-prompt">CLICK ANYWHERE TO START</p>
        </div>
      </div>
    </div>
  );
}