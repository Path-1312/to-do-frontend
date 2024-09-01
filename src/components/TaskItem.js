// src/components/TaskItem.js
import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import EditTaskModal from './EditTaskModal';

const TaskItem = ({ task, onTaskUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleComplete = async () => {
    try {
      const response = await axios.patch(
        `https://to-do-backend-orjo.onrender.com/api/tasks/${task._id}`,
        { completed: true }
      );
      onTaskUpdate(response.data);
    } catch (error) {
      console.error('Error marking task complete', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://to-do-backend-orjo.onrender.com/api/tasks/${task._id}`);
      onTaskUpdate(null);
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  return (
    <li>
      <div className='task-info'>
        <span className='task-name'>{task.name}</span>

        <div className='task-dates'>
          <div className='task-date'>
            Due Date: {task.dueDate ? moment(task.dueDate).format('DD-MM-YYYY'): '-'}
          </div>
          <div className='task-created-date'>
            Created On: {moment(task.createdOn).format('DD-MM-YYYY')}
          </div>
        </div>
      </div>
      {!task.completed && (
        <>
          <button onClick={handleComplete} disabled={task.completed}>
            Complete
          </button>
          <button
            className='edit-button'
            onClick={() => setShowEditModal(true)}
          >
            Edit
          </button>
        </>
      )}

      <button className='delete-button' onClick={handleDelete}>
        Delete
      </button>

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onTaskUpdate={onTaskUpdate}
        />
      )}
    </li>
  );
};

export default TaskItem;
