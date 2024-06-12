import React, { useState } from 'react';
import TaskList from './TaskList';

const ParentComponent = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = {
      subtask: 'New Task',
      plannedStart: '2022-06-15',
      plannedEnd: '2022-06-30',
      subtasks: []  // Adicione um array vazio para as subtasks da nova task
    };

    setTasks([...tasks, newTask]);
  };

  const addSubtask = (taskIndex, newSubtask) => {
    setTasks(tasks.map((task, index) => {
      if (index === taskIndex) {
        return {
          ...task,
          subtasks: [...task.subtasks, newSubtask]
        };
      }
      return task;
    }));
  };

  return (
    <div>
      <TaskList tasks={tasks} addSubtask={addSubtask} />
      <button onClick={addTask}>
        Add Task
      </button>
    </div>
  );
};

export default ParentComponent;
