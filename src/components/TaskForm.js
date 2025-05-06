import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ task, refreshTasks }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [completed, setCompleted] = useState(task ? task.completed : false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { title, description, completed };
        try {
            if (task) {
                await axios.put(`http://localhost:5000/api/tasks/${task._id}`, newTask);
            } else {
                await axios.post('http://localhost:5000/api/tasks', newTask);
            }
            refreshTasks();
            setTitle('');
            setDescription('');
            setCompleted(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className='status'>
                <label>
                    Completed:
                </label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => setCompleted(!completed)}
                />
            </div>
            <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
        </form>

    );
};

export default TaskForm;
