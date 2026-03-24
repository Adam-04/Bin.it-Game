import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { authApi } from "../api/auth";
import "./css/register.css";

export default function RegisterPage() {
  // Creating States and navigate
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
    setError(""); 

    let errorMessages = [];

    if (email !== confirmEmail) {
      errorMessages.push("Email Address and Confirm Email Address must match.");
    }

    if (password !== confirmPassword) {
      errorMessages.push("Password and Confirm Password must match.");
    }

    if (errorMessages.length > 0) {
      setError(errorMessages.join(" "));
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      await authApi.register(username, email, password);
      navigate("/login");
    } catch (err: any) {
      setError("Registration failed. Email or username might be already taken.");
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="register-title">CREATE AN ACCOUNT</h1>
        
        <form onSubmit={handleRegister}>
          <div className="input-field-wrapper">
            <label className="input-field-label">Username</label>
            <input className="input-field-box" type="text" placeholder="Choose a username" 
              value={username} onChange={(e) => setUsername(e.target.value)} required /> 
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Email Address</label>
            <input className="input-field-box" type="email" placeholder="email@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Confirm Email Address</label>
            <input className="input-field-box" type="email" placeholder="email@example.com"
              value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} required />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Password</label>
            <input className="input-field-box" type="password" placeholder="••••••••" 
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="input-field-wrapper">
            <label className="input-field-label">Confirm Password</label>
            <input className="input-field-box" type="password" placeholder="••••••••" 
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          {/* Display error message if login fails */}
          {error && 
          <p style={{ color: "#8C0000", fontSize: "1rem", marginBottom: "10px" }}>{error}</p>}

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