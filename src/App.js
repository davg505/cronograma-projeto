import React, { useState } from 'react';
import GanttChart from './components/GanttChart';
import TaskForm from './components/TaskForm';
import './styles/App.css';

const App = () => {
    const [tasks, setTasks] = useState({ data: [], links: [] });
    const [savedTasks, setSavedTasks] = useState([]);

    const addTask = (task) => {
        const newTask = {
            id: Date.now().toString(),
            parentTask: task.parentTask,
            subtask: task.subtask,
            plannedStart: task.plannedStart,
            plannedEnd: task.plannedEnd,
            actualStart: task.actualStart,
            actualEnd: task.actualEnd,
            resources: task.resources,
            responsible: task.responsible,
            cost: task.cost,
            observations: task.observations,
            progress: 0,
            subtasks:[], 
        };
    
        const newLink = {
            id: tasks.links.length + 1,
            source: task.predecessor,
            target: newTask.id,
            type: "0",
        };
    
        setTasks(prevTasks => ({
            data: [...prevTasks.data, newTask],
            links: task.predecessor ? [...prevTasks.links, newLink] : prevTasks.links
        }));
    };

    const saveTasksAndSubtasksToJson = (tasks, subtasks) => {
        const tasksWithSubtasks = tasks.map(task => ({
            ...task,
            subtasks: subtasks.filter(subtask => subtask.parentTask === task.parentTask)
        }));
        
        const json = JSON.stringify({ data: tasksWithSubtasks }, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'tasks.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const loadTasksFromJson = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                setTasks(data);
            };
            reader.readAsText(file);
        }
    };

    const handleSaveTasks = () => {
        if (!Array.isArray(tasks)) {
            console.error("tasks is not an array");
            return;
        }
    
        const allTasks = [];
        tasks.forEach(task => {
            allTasks.push(task);
            if (task.subtasks) {
                task.subtasks.forEach(subtask => {
                    allTasks.push(subtask);
                });
            }
        });
        setSavedTasks(allTasks);
    };
    return (
        <div className="app-container">
            <TaskForm addTask={addTask} />
            <GanttChart tasks={tasks} onTasksSave={handleSaveTasks} />
            <div className="buttons-container">
                <button onClick={() => saveTasksAndSubtasksToJson(tasks.data, savedTasks)}>Salvar Json</button>
                <button onClick={handleSaveTasks}>Salvar Tarefas</button>
                <input type="file" accept=".json" onChange={loadTasksFromJson} />
            </div>
        </div>
    );
};

export default App;
