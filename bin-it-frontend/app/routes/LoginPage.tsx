import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { authApi } from "../api/api.auth";
import "../app.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authApi.login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId); // Store userId for later use
      navigate("/");
    } catch (err: any) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <main className="auth-card">
        <h1 className="auth-title">LOGIN</h1>

        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label className="input-label">Username</label>
            <input className="input-box" type="text" placeholder="Username" 
              value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Password</label>
            <input className="input-box" type="password" placeholder="••••••••" 
              value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>

          {error && <p style={{ color: "#8C0000", fontSize: "0.85rem", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

          <button type="submit" className="action-button" disabled={loading}>
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>

        <p className="redirect-text">
          New here? <Link to="/register" className="redirect-link">Create Account</Link>
        </p>
      </main>
    </div>
  );
}