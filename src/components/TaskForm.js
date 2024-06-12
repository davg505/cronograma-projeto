import React, { useState } from 'react';
import './styles/TaskForm.css'; // Importe o arquivo CSS

const TaskForm = ({ addTask }) => {
    const [task, setTask] = useState({
        parentTask: '',
        plannedStart: '',
        plannedEnd: '',
        actualStart: '',
        actualEnd: '',
        predecessor: '',
        resources: '',
        responsible: '',
        cost: '',
        observations: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(task);
        console.log("Submitting task:", task);
        setTask({
            parentTask: '',
            plannedStart: '',
            plannedEnd: '',
            actualStart: '',
            actualEnd: '',
            predecessor: '',
            resources: '',
            responsible: '',
            cost: '',
            observations: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="label" htmlFor="parentTask">Task - Principal</label>
                <input 
                    id="parentTask"
                    name="parentTask" 
                    className="input"
                    value={task.parentTask} 
                    onChange={handleChange} 
                    placeholder="Task Name" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="plannedStart">Data planejada - início:</label>
                <input 
                    id="plannedStart"
                    name="plannedStart" 
                    type="date" 
                    className="input"
                    value={task.plannedStart} 
                    onChange={handleChange} 
                    placeholder="Planned Start" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="plannedEnd">Data  planejada  - fim:</label>
                <input 
                    id="plannedEnd"
                    name="plannedEnd" 
                    type="date" 
                    className="input"
                    value={task.plannedEnd} 
                    onChange={handleChange} 
                    placeholder="Planned End" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="actualStart">Dara realizada - início:</label>
                <input 
                    id="actualStart"
                    name="actualStart" 
                    type="date" 
                    className="input"
                    value={task.actualStart} 
                    onChange={handleChange} 
                    placeholder="Actual Start" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="actualEnd">Data realizada - fim:</label>
                <input 
                    id="actualEnd"
                    name="actualEnd" 
                    type="date" 
                    className="input"
                    value={task.actualEnd} 
                    onChange={handleChange} 
                    placeholder="Actual End" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="predecessor">Predecessor:</label>
                <input 
                    id="predecessor"
                    name="predecessor" 
                    className="input"
                    value={task.predecessor} 
                    onChange={handleChange} 
                    placeholder="Predecessor" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="resources">Recursos:</label>
                <input 
                    id="resources"
                    name="resources" 
                    className="input"
                    value={task.resources} 
                    onChange={handleChange} 
                    placeholder="Resources" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="responsible">Responsável:</label>
                <input 
                    id="responsible"
                    name="responsible" 
                    className="input"
                    value={task.responsible} 
                    onChange={handleChange} 
                    placeholder="Responsible" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="cost">Custos/Investimento:</label>
                <input 
                    id="cost"
                    name="cost" 
                    className="input"
                    value={task.cost} 
                    onChange={handleChange} 
                    placeholder="Cost" 
                />
            </div>
            <div className="form-group">
                <label className="label" htmlFor="observations">Observação:</label>
                <input 
                    id="observations"
                    name="observations" 
                    className="input"
                    value={task.observations} 
                    onChange={handleChange} 
                    placeholder="Observations" 
                />
            </div>
            <button type="submit">Adcionar Task</button>
        </form>
    );
};

export default TaskForm;
