import React, { useState } from 'react';
import './styles/TaskForm.css'; // Importe o arquivo CSS

const SubTaskForm = ({ parentTask, onSubmit,}) => {
    const [subtask, setSubtask] = useState({
        parentTask: parentTask.parentTask,
        subtask: '',
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
        setSubtask(prevSubtask => ({
            ...prevSubtask,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(subtask);
        setSubtask({
            parentTask: parentTask.parentTask,
            subtask: '',
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
            <input 
                id="subtask"
                name="subtask" 
                className="input"
                value={subtask.subtask} 
                onChange={handleChange} 
                placeholder="Subtask" 
            />
            <input
                type="date" 
                name="plannedStart"
                value={subtask.plannedStart}
                onChange={handleChange}
                placeholder="Data planejada - Inicio"
            />
            <input 
                type="date" 
                name="plannedEnd" 
                value={subtask.plannedEnd}
                onChange={handleChange}
                placeholder="Data planejada - Final"
            />
            <input 
                type="date" 
                name="actualStart"
                value={subtask.actualStart}
                onChange={handleChange}
                placeholder="Data Realizada - Inicio"
            />
            <input 
                type="date" 
                name="actualEnd" 
                value={subtask.actualEnd}
                onChange={handleChange}
                placeholder="Data Realizada - Final"
            />
            <input 
                name="responsible"
                value={subtask.responsible}
                onChange={handleChange}
                placeholder="Responsavel"
            />
            <input 
                name="cost"
                value={subtask.cost}
                onChange={handleChange}
                placeholder="Custo"
            />
            <input 
                name="observations"
                value={subtask.observations}
                onChange={handleChange}
                placeholder="Observação"
            />
            <button type="submit">Adicionar</button>
        </form>
    );
};


export default SubTaskForm;
