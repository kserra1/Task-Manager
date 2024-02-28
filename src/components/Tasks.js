import React, { useState, useEffect } from 'react';
import httpClient from '../httpClient';
import { setCookie } from '../actions/cookieActions';
import { connect } from 'react-redux';
const TaskManager = ({ setCookie } ) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch tasks when the component mounts
      httpClient.get('/api/tasks', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => setTasks(response.data.tasks))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleAddTask = () => {
    // Make a POST request to add a new task
      httpClient.post('/api/tasks', { text: newTask }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        const data = response.data;
        // Update tasks state with the new task
        setTasks([...tasks, { id: data.id, text: newTask, completed: false }]);
        // Clear the newTask state
        setNewTask('');
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};


const mapDispatchToProps = dispatch => {
    return {
        setCookie: (cookieData) => dispatch(setCookie(cookieData)),
    };
};

export default connect(null, mapDispatchToProps)(TaskManager);