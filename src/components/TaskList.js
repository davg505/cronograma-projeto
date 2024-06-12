import React from 'react';

const TaskList = ({ tasks, addSubtask }) => (
  <ul>
    {tasks.map((task, index) => (
      <li key={index}>
         {task.subtask} (Planned: {task.plannedStart} - {task.plannedEnd})
         <ul>
           {task.subtasks.map((subtask, subIndex) => (
             <li key={subIndex}>
               {subtask.subtask} (Planned: {subtask.plannedStart} - {subtask.plannedEnd})
             </li>
           ))}
         </ul>
         <button onClick={() => addSubtask(index, { subtask: 'New Subtask', plannedStart: '2022-06-15', plannedEnd: '2022-06-30' })}>
           Add Subtask
         </button>
      </li>
    ))}
  </ul>
);

export default TaskList;
