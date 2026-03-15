import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { authApi } from "../api/auth";
import "../app.css";

/** 
 * RegisterPage Component
 * - Handles the user registration process for account creation 
 *   with form validation and error handling.
 * - Interacts with Springboot backend API to create a new user account, 
 *   redirecting to login page upon successful registration. 
 */
export default function RegisterPage() {

  // Manages all the form state for user inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback state for form validation 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles the registration form submission with validation checks
   * - Validates that email and confirm email match, and password and confirm password match
   * - Performs client-side validation before attempting to call the backend API
   */
const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state on new attempts

    let errorMessages = [];

    // Validate that email and confirm email match
    if (email !== confirmEmail) {
      errorMessages.push("Email Address and Confirm Email Address do not match.");
    }

    // Validate that password and confirm password match
    if (password !== confirmPassword) {
      errorMessages.push("Password and Confirm Password do not match.");
    }

    // If there are validation errors, set the error state and stop the registration process
    if (errorMessages.length > 0) {
      setError(errorMessages.join(" "));
      setLoading(false);
      return;
    }

    try {
      // Call and send registration data to the backend API, navigating to
      // login page on success, or show error message on failure
      await authApi.register(username, email, password);
      navigate("/login");
    } catch (err: any) {
      // Handle registration errors (e.g., username/email already taken) and 
      setError("Registration failed. Email or username is already taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Background Logo */}
      <img src="/Gemini-Logo.png" alt="Bin-It Logo" className="logo-image" />

      {/* Visual Background Elements (Blobs) */}
      <div className="nebula-container">
        <div className="blob blob-yellow"></div>
        <div className="blob blob-teal"></div>
      </div>

      <main className="auth-card">
        <h1 className="auth-title">REGISTER YOUR ACCOUNT</h1>
        
        {/* Registration form with input fields for username, email, 
        confirm email, password, and confirm password */}
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

          {/* Display error messages if validation fails or registration API call fails */}
          {error && <p style={{ color: "#8C0000", fontSize: "0.85rem", textAlign: "center", marginBottom: "10px" }}>{error}</p>}

          {/* Submit button for registration, disabled while loading to prevent multiple submissions */}
          <button type="submit" className="action-button" disabled={loading}>JOIN NOW</button>
        </form>

        {/* Redirect link for users who already have an account to go to the login page */}
        <p className="redirect-text">
          Already a member? <Link to="/login" className="redirect-link">Log In</Link>
        </p>
      </main>
    </div>
  );
}