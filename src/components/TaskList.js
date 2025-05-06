import React from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = ({ tasks, refreshTasks }) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            refreshTasks();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="task-list">
            <ul>
                {tasks.map((task) => (
                    <li key={task._id} className="task-item">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <span
                            className={`status-label ${task.completed ? 'completed' : 'not-completed'}`}
                        >
                            {task.completed ? 'Completed' : 'Not Completed'}
                        </span>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
