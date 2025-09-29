// TaskForm.jsx
import { useState } from "react";
import API from "../services/api";
import "./TaskForm.css";

const TaskForm = ({ onTaskAdded }) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await API.post("/tasks", form);
      onTaskAdded(res.data);
      setForm({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modern-task-form">
      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input 
          id="title"
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Enter task title..." 
          required 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Enter task description (optional)..." 
          rows="3"
        />
      </div>
      
      <button type="submit" className="btn-primary" disabled={isLoading}>
        {isLoading ? "Adding..." : "➕ Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;