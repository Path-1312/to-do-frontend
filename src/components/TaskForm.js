import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskUpdate }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://to-do-backend-orjo.onrender.com/api/tasks', {
        name,
        dueDate,
        reminder,
      });
      onTaskUpdate();
      setName('');
      setDueDate('');
      setReminder(false);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div class='task-input'>
      <form onSubmit={handleSubmit}>
        <h2>Add New Task</h2>
        <input
          type='text'
          placeholder='Task name'
          id='taskName'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type='date'
          id='taskDueDate'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div class='reminder-option'>
          <input
            type='checkbox'
            id='reminderCheck'
            value={reminder}
            onClick={(e) => setReminder(e.target.checked)}
          ></input>
          <label for='reminderCheck'>Set Reminder</label>
        </div>
        <button type='submit' id='addTaskButton'>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
