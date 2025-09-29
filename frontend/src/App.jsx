import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import Dashboard from './components/Dashboard';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route 
            path="/signup" 
            element={!user ? <Signup /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/tasks" 
            element={user ? <TaskList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/dashboard" : "/login"} />} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;