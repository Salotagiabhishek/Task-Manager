// Dashboard.jsx
import { useState, useEffect } from "react";
import API from "../services/api";
import TaskForm from "./TaskForm";
import "./Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [activeSection, setActiveSection] = useState("tasks");
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });
  const [navbarColor, setNavbarColor] = useState("gradient-1");
  const [darkMode, setDarkMode] = useState(false);

  const colorSchemes = {
    "gradient-1": { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", name: "Purple Dream" },
    "gradient-2": { background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", name: "Pink Sunset" },
    "gradient-3": { background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", name: "Blue Ocean" },
    "gradient-4": { background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", name: "Green Forest" }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
      calculateStats(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const calculateStats = (tasks) => {
    const total = tasks.length;
    const pending = tasks.filter(task => task.status === "pending").length;
    const completed = tasks.filter(task => task.status === "completed").length;
    setStats({ total, pending, completed });
  };

  useEffect(() => {
    fetchTasks();
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleAddTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    calculateStats(newTasks);
  };

  const handleToggle = async (id, status) => {
    try {
      const newStatus = status === "pending" ? "completed" : "pending";
      const res = await API.put(`/tasks/${id}`, { status: newStatus });
      const updatedTasks = tasks.map((t) => (t._id === id ? res.data : t));
      setTasks(updatedTasks);
      calculateStats(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
      console.log("Tasl Id:")
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      const updatedTasks = tasks.filter((t) => t._id !== id);
      setTasks(updatedTasks);
      calculateStats(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleColorChange = (color) => {
    setNavbarColor(color);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      {}
      <div className="sidebar" style={{ background: colorSchemes[navbarColor].background }}>
        <div className="sidebar-header">
          <h2>TaskSync Pro</h2>
          <div className="user-welcome">
            <span>👋 Welcome!</span>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === "tasks" ? "active" : ""}`}
            onClick={() => setActiveSection("tasks")}
          >
            📋 My Tasks
          </button>
          <button 
            className={`nav-item ${activeSection === "add" ? "active" : ""}`}
            onClick={() => setActiveSection("add")}
          >
            ➕ Add Task
          </button>
          <button 
            className={`nav-item ${activeSection === "stats" ? "active" : ""}`}
            onClick={() => setActiveSection("stats")}
          >
            📊 Statistics
          </button>
          <button 
            className={`nav-item ${activeSection === "theme" ? "active" : ""}`}
            onClick={() => setActiveSection("theme")}
          >
            🎨 Theme Settings
          </button>
        </nav>

        {}
        <div className="stats-card">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.pending}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.completed}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="main-content">
        {activeSection === "tasks" && (
          <div className="content-section">
            <div className="section-header">
              <h1>My Tasks ({tasks.length})</h1>
              <button 
                onClick={toggleDarkMode}
                className="theme-toggle-btn"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <div className="tasks-container">
              {tasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>No tasks yet</h3>
                  <p>Start by adding your first task!</p>
                </div>
              ) : (
                <div className="tasks-table-container">
                  <table className="tasks-table">
                    <thead>
                      <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Section</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task) => (
                        <tr key={task._id} className={`task-row ${task.status === "completed" ? "completed" : ""}`}>
                          <td className="task-name">
                            <strong>{task.title}</strong>
                          </td>
                          <td className="task-description">
                            {task.description}
                          </td>
                          <td className="task-section">
                            <span className="section-badge">
                              {task.section || "General"}
                            </span>
                          </td>
                          <td className="task-status-cell">
                            <span className={`status-badge ${task.status}`}>
                              {task.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                            </span>
                          </td>
                          <td className="task-actions-cell">
                            <div className="table-actions">
                              <button 
                                onClick={() => handleToggle(task._id, task.status)}
                                className={`status-btn ${task.status === "pending" ? "btn-complete" : "btn-pending"}`}
                              >
                                {task.status === "pending" ? "Complete" : "Pending"}
                              </button>
                              <button 
                                onClick={() => handleDelete(task._id)}
                                className="btn-delete"
                                title="Delete Task"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === "add" && (
          <div className="content-section">
            <div className="section-header">
              <h1>Add New Task</h1>
              <button 
                onClick={toggleDarkMode}
                className="theme-toggle-btn"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <TaskForm onTaskAdded={handleAddTask} />
          </div>
        )}

        {activeSection === "stats" && (
          <div className="content-section">
            <div className="section-header">
              <h1>Task Statistics</h1>
              <button 
                onClick={toggleDarkMode}
                className="theme-toggle-btn"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <div className="stats-container">
              <div className="stat-card large">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <h3>Productivity Overview</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${stats.total ? (stats.completed / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <p>{stats.completed} of {stats.total} tasks completed</p>
                </div>
              </div>
              
              <div className="stats-grid-large">
                <div className="stat-card">
                  <span className="stat-number-large">{stats.total}</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number-large">{stats.pending}</span>
                  <span className="stat-label">Pending</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number-large">{stats.completed}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "theme" && (
          <div className="content-section">
            <div className="section-header">
              <h1>Theme Settings</h1>
              <button 
                onClick={toggleDarkMode}
                className="theme-toggle-btn"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            <div className="theme-settings">
              <h3>Choose Navbar Color Scheme</h3>
              <div className="color-schemes-grid">
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                  <div 
                    key={key}
                    className={`color-scheme-card ${navbarColor === key ? "active" : ""}`}
                    onClick={() => handleColorChange(key)}
                  >
                    <div 
                      className="color-preview" 
                      style={{ background: scheme.background }}
                    ></div>
                    <div className="color-info">
                      <span className="color-name">{scheme.name}</span>
                      {navbarColor === key && <span className="current-badge">Current</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Dashboard;