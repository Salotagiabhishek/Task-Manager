import { useEffect, useState } from "react";
import API from "../services/api";
import TaskForm from "./TaskForm";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = (task) => setTasks([...tasks, task]);

  const handleToggle = async (id, status) => {
    const res = await API.put(`/tasks/${id}`, { status });
    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="task-card">
      <h2>My Tasks</h2>
      <TaskForm onTaskAdded={handleAddTask} />
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.status === "completed" ? "completed" : ""}`}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => handleToggle(task._id, task.status === "pending" ? "completed" : "pending")} className="btn-warning">
                {task.status === "pending" ? "Complete" : "pending"}
              </button>
              <button onClick={() => handleDelete(task._id)} className="btn-danger">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
