import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await API.post("/auth/register", form);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {}
      <div className="signup-form-section">
        <div className="signup-card">
          <div className="signup-header">
            <h2>Create Your Account</h2>
            <p>Join us today and get started</p>
          </div>
          
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                name="name" 
                placeholder="Enter your full name" 
                value={form.name} 
                onChange={handleChange}
                required 
              />
            </div>
            
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
                placeholder="Create a password" 
                value={form.password} 
                onChange={handleChange}
                required 
                minLength="6"
              />
            </div>
            
            <button 
              type="submit" 
              className={`signup-btn-primary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          
          <div className="signup-footer">
            <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
          </div>
        </div>
      </div>

      {}
      <div className="signup-graphic-section">
        <div className="signup-graphic-content">
          <div className="signup-graphic-image">
            <div className="signup-floating-element el1"></div>
            <div className="signup-floating-element el2"></div>
            <div className="signup-floating-element el3"></div>
            <div className="signup-icon">👥</div>
          </div>
          <div className="signup-graphic-text">
            <h3>Join Our Community</h3>
            <p>Sign up today and discover how thousands of users manage their tasks efficiently.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;