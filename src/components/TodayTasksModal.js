import React from 'react';
import TaskItem from './TaskItem';

const TodayTasksModal = ({ tasks, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content task-list today-list'>
        <span className='close' onClick={onClose}>&times;</span>
        <h2>Tasks Due Today</h2>
        {tasks.length === 0 ? (
          <p>No tasks due today.</p>
        ) : (
          <ul id="tasks">
            {tasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onTaskUpdate={() => {}}
                handleEdit={() => {}}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodayTasksModal;
