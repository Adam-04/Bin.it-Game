import { Link } from "react-router";
import "./css/register.css";

export default function RegisterPage() {
  return (
    <div className="register-page">
      {/* BinIt Logo */}
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      {/* Background Blobs for depth/Game Aesthetics */}
      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      {/* Box containing all input fields */}
      <main className="register-containter">
        <h1 className="register-title">CREATE ACCOUNT</h1>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-field-wrapper">
            <label className="input-field-label">Username</label>
            <input className="input-field-box" type="text" placeholder="Choose a username" />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Email Address</label>
            <input className="input-field-box" type="email" placeholder="email@example.com" />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Confirm Email Address</label>
            <input className="input-field-box" type="email" placeholder="email@example.com" />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Password</label>
            <input className="input-field-box" type="password" placeholder="••••••••" />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Confirm Password</label>
            <input className="input-field-box" type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="register-button">
            JOIN NOW
          </button>
        </form>

        <p className="redirect-login-text">
          Already a member? <Link to="/login" className="redirect-login-link">Log In</Link>
        </p>
      </main>
    </div>
  );
}