// src/components/TaskPage.js
import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import API from '../api';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
      } else {
        console.error(err);
      }
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const res = await API.post('/tasks', newTask);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async (taskId, isCompleted) => {
    try {
      const res = await API.put(`/tasks/${taskId}`, { completed: isCompleted });
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? res.data : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default TaskPage;
