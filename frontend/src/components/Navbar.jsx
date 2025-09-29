// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-brand">
        <span className="logo-icon">🚀</span>
        <h1 className="logo-text">TaskSync Pro</h1>
      </div>
      
      <div className="navbar-menu">
        {!user ? (
          <div className="auth-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup">Sign Up</Link>
          </div>
        ) : (
          <div className="user-menu">
            <span className="welcome-text">Welcome, {user.name || user.email}!</span>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn icon-only" title="Logout">
              <span className="logout-icon">🚪</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;