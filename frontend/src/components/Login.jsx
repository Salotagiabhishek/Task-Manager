import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      setSuccess("Login successful! Redirecting to your dashboard...");
      setTimeout(() => {
        navigate("/tasks");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {}
      <div className="login-graphic-section">
        <div className="login-graphic-content">
          <div className="login-graphic-image">
            <div className="login-floating-element el1"></div>
            <div className="login-floating-element el2"></div>
            <div className="login-floating-element el3"></div>
            <div className="login-icon">🔐</div>
          </div>
          <div className="login-graphic-text">
            <h3>Welcome Back</h3>
            <p>Sign in to continue your journey and access your personalized dashboard.</p>
          </div>
        </div>
      </div>

      {}
      <div className="login-form-section">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email" 
                placeholder="Enter your email" 
                value={form.email} 
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password" 
                placeholder="Enter your password" 
                value={form.password} 
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="login-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#forgot" className="forgot-link">Forgot password?</a>
            </div>
            
            <button 
              type="submit" 
              className={`login-btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;