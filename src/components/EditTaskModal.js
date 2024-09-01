// src/components/EditTaskModal.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTaskModal = ({ task, onClose, onTaskUpdate }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDueDate(task.dueDate);
      setReminder(task.reminder);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, {
        name,
        dueDate,
        reminder,
      });
      onTaskUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <div className='modal'>
      <div className='modal-content task-input'>
        <span className='close' onClick={onClose}>
          &times;
        </span>
        <h2>Edit Task</h2>
        <form onSubmit={handleSubmit}>
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
          <div className='reminder-option'>
            <input
              type='checkbox'
              id='reminderCheck'
              checked={reminder}
              onChange={(e) => setReminder(e.target.checked)}
            />
            <label>Set Reminder</label>
          </div>
          <button type='submit' id='addTaskButton'>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
