import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { authApi } from "../api/auth";
import "../app.css";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    let errorMessages = [];

    // Validation checks
    if (email !== confirmEmail) {
      errorMessages.push("Email Address and Confirm Email Address do not match.");
    }

    if (password !== confirmPassword) {
      errorMessages.push("Password and Confirm Password do not match.");
    }

    
    if (errorMessages.length > 0) {
      setError(errorMessages.join(" "));
      setLoading(false);
      return;
    }

    try {
      await authApi.register(username, email, password);
      navigate("/login");
    } catch (err: any) {
      setError("Registration failed. Email or username is already taken.");
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
        <h1 className="auth-title">REGISTER YOUR ACCOUNT</h1>
        
        <form onSubmit={handleRegister}>
          <div className="input-wrapper">
            <label className="input-label">Username</label>
            <input className="input-box" type="text" placeholder="Enter your username" 
            value={username} onChange={(e) => setUsername(e.target.value)} required /> 
          </div>

          <div className="input-wrapper">
            <label className="input-label">Email</label>
            <input className="input-box" type="email" placeholder="Enter your email address" 
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Confirm Email</label>
            <input className="input-box" type="email" placeholder="Confirm your email address" 
            value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Password</label>
            <input className="input-box" type="password" placeholder="••••••••" 
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Confirm Password</label>
            <input className="input-box" type="password" placeholder="••••••••" 
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          {error && <p style={{ color: "#8C0000", fontSize: "0.85rem", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

          <button type="submit" className="action-button" disabled={loading}>JOIN NOW</button>
        </form>

        <p className="redirect-text">
          Already a member? <Link to="/login" className="redirect-link">Log In</Link>
        </p>
      </main>
    </div>
  );
}