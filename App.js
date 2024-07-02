import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskContent, setEditTaskContent] = useState('');
  const [filter, setFilter] = useState('all'); // all, completed, pending

  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleCompleteTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId, newContent) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, text: newContent } : task
    );
    setTasks(updatedTasks);
    setEditTaskId(null); // Desactiva la edición después de guardar
    setEditTaskContent('');
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'pending') {
      return !task.completed;
    }
    return true; // 'all' filter
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn btn-outline-primary" type="button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <ul className="list-group">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              {editTaskId === task.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={editTaskContent}
                  onChange={(e) => setEditTaskContent(e.target.value)}
                  onBlur={() => handleEditTask(task.id, editTaskContent)}
                  autoFocus
                />
              ) : (
                <span>{task.text}</span>
              )}
              <div>
                {editTaskId !== task.id && (
                  <button className="btn btn-sm btn-success mx-1" onClick={() => {
                    setEditTaskId(task.id);
                    setEditTaskContent(task.text);
                  }}>
                    Edit
                  </button>
                )}
                <button className="btn btn-sm btn-success mx-1" onClick={() => handleCompleteTask(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <button
          className={`btn btn-outline-secondary me-2 ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All
        </button>
        <button
          className={`btn btn-outline-secondary me-2 ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </button>
        <button
          className={`btn btn-outline-secondary ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => handleFilterChange('pending')}
        >
          Pending
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
