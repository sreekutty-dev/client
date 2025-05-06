// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import './App.css';

// const App = () => {
//   const [tasks, setTasks] = useState([]);

//   const refreshTasks = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/tasks');
//       setTasks(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     refreshTasks();
//   }, []);

//   return (
//     <div className="app-container">
//       <h1>Task Manager</h1>
//       <TaskForm refreshTasks={refreshTasks} />
//       <TaskList tasks={tasks} refreshTasks={refreshTasks} />
//     </div>

//   );
// };

// export default App;


// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import TaskPage from './components/TaskPage'; // your task manager UI
import { isLoggedIn } from './auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/tasks"
          element={isLoggedIn() ? <TaskPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
}

export default App;
