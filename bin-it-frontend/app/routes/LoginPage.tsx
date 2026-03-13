import { Link } from "react-router";
import "./css/login.css"; 

export default function LoginPage() {
  return (
    <div className="login-page">
      {/* BinIt Logo */}
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      {/* Background Blobs for depth */}
      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <main className="login-container">
        <h1 className="login-title">LOGIN</h1>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-field-wrapper">
            <label className="input-field-label">Email Address</label>
            <input className="input-field-box" type="email" placeholder="email@example.com" />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Password</label>
            <input className="input-field-box" type="password" placeholder="••••••••" />
          </div>

          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>

        <p className="register-redirect-text">
          New to the game? <Link to="/register" className="register-redirect-link">Create Account</Link>
        </p>
      </main>
    </div>
  );
}