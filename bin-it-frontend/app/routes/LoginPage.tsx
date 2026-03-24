import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { authApi } from "../api/auth";
import "./css/login.css"; 

export default function LoginPage() {

  // Creating States and navigate
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    const data = await authApi.login(username, password);
    // Store token in localStorage
    localStorage.setItem("token", data.token);

    // Redirect to welcome page when successful - NEED TO CHANGE WHEN HOMEPAGE IS MADE!!!!
    navigate("/");
  } catch (err: any) {
    setError("Invalid username or password. Please try again.");
  } finally {
    setLoading(false);
  }
};
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

        <form onSubmit={handleLogin}>
          <div className="input-field-wrapper">
            <label className="input-field-label">Username</label>
            <input className="input-field-box" type="text" placeholder="Enter your username" 
            value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Password</label>
            <input className="input-field-box" type="password" placeholder="••••••••" 
            value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          {/* Display error message if login fails */}
          {error && 
          <p style={{ color: "#8C0000", fontSize: "1rem", marginBottom: "10px" }}>{error}</p>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>

        <p className="register-redirect-text">
          New to the game? <Link to="/register" className="register-redirect-link">Create Account</Link>
        </p>
      </main>
    </div>
  );
}