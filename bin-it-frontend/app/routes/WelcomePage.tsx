import { useNavigate } from "react-router";
import "./css/welcome.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page" onClick={() => navigate("/login")}>
      <div className="welcome-container">
        {/* Binit Logo */}
        <img src="/Gemini-Logo.png" alt="BinIt Logo" className="welcome-bg-logo" />
        
        {/* Text overlay */}
        <div className="welcome-text-overlay">
          <h1 className="welcome-title">WELCOME TO BIN-IT</h1>
          <p className="click-prompt">Click anywhere to start</p>
        </div>
      </div>
    </div>
  );
}