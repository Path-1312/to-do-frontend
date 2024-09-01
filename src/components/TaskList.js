// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TodayTasksModal from './TodayTasksModal'; // Import the modal component

const TaskList = () => {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTodayTasks, setShowTodayTasks] = useState(false);
  const [todayTasks, setTodayTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://to-do-backend-orjo.onrender.com/api/tasks');
      const pTasks = response?.data?.filter((e) => !e.completed);
      const cTasks = response?.data?.filter((e) => e.completed);
      setCompletedTasks(cTasks);
      setPendingTasks(pTasks);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks', error);
      setLoading(false);
    }
  };

  const fetchTodayTasks = async () => {
    try {
      const response = await axios.get('https://to-do-backend-orjo.onrender.com/api/tasks/due-today');
      setTodayTasks(response.data);
      setShowTodayTasks(true);
    } catch (error) {
      console.error('Error fetching today\'s tasks', error);
    }
  };

  return (
    <div>
      <TaskForm onTaskUpdate={fetchTasks} />
      <button onClick={fetchTodayTasks} class="todayDueButton">
        Today's Due Tasks
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='task-container'>
          <div className='task-list task-list-flex' style={{ marginRight: '10px' }}>
            <h2>Pending Task List</h2>
            <ul id='tasks'>
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onTaskUpdate={fetchTasks}
                />
              ))}
            </ul>
          </div>
          <div className='task-list task-list-flex' style={{ marginLeft: '10px' }}>
            <h2>Completed Task List</h2>
            <ul id='tasks'>
              {completedTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onTaskUpdate={fetchTasks}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      {showTodayTasks && (
        <TodayTasksModal
          tasks={todayTasks}
          onClose={() => setShowTodayTasks(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
