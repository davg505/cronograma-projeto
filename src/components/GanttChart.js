import React, { useEffect, useState } from 'react';
import SubtaskForm from './SubTaskForm'; // Importe o componente SubtaskForm de SubtaskForm.js
import './styles/GanttChart.css';

const GanttChart = ({ tasks, onSaveTasks }) => {
    const [bars, setBars] = useState([]);
    const [dates, setDates] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [showSubtaskForm, setShowSubtaskForm] = useState(false);
    const [selectedParentTask, setSelectedParentTask] = useState(null);
    const [chartTasks, setChartTasks] = useState([]);
    const [subtaskBars, setSubtaskBars] = useState({});
    const [savedTasks, setSavedTasks] = useState([]);

    useEffect(() => {
        if (tasks && tasks.data) {
            setChartTasks(tasks.data);
            calculateBars(tasks.data);
        }
    }, [tasks]);

    const handleAddSubtaskClick = (parentTask) => {
        setShowSubtaskForm(true);
        setSelectedParentTask(parentTask);
    };

    const randomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const handleSaveTasks = () => {
        const allTasks = [];
        chartTasks.forEach(task => {
            allTasks.push(task);
            if (task.subtasks) {
                task.subtasks.forEach(subtask => {
                    allTasks.push(subtask);
                });
            }
        });
        setSavedTasks(allTasks);
        onSaveTasks(allTasks);
    };

    const calculateBars = (tasks) => {
        const newBars = [];
        const newSubtaskBars = {};
    
        tasks.forEach(task => {
            const plannedStart = new Date(task.plannedStart);
            const plannedEnd = new Date(task.plannedEnd);
            const actualStart = task.actualStart ? new Date(task.actualStart) : plannedStart;
            const actualEnd = task.actualEnd ? new Date(task.actualEnd) : plannedEnd;
    
            const totalPlannedDays = (plannedEnd - plannedStart) / (1000 * 60 * 60 * 24);
    
            const startOffset = (actualStart - plannedStart) / (1000 * 60 * 60 * 24);
            const actualDuration = (actualEnd - actualStart) / (1000 * 60 * 60 * 24);
    
            const plannedWidth = (totalPlannedDays / 30) * 100; // Assuming each month has 30 days
            const actualWidth = (actualDuration / 30) * 100;
    
            const left = (startOffset / 30) * 100; // Assuming each month has 30 days
    
            newBars.push({
                id: task.id,
                parentTask: task.parentTask, // Adiciona a parentTask
                status: 'planejado', // Indica que é planejado
                planned: {
                    left: `${left}%`,
                    width: `${plannedWidth}%`,
                    backgroundColor: randomColor(),
                },
                actual: {
                    left: `${left}%`,
                    width: `${actualWidth}%`,
                    backgroundColor: randomColor(), // Use uma cor diferente para tarefas reais
                }
            });
    
            const subtaskBars = (task.subtasks || []).map(subtask => {
                const subtaskPlannedStart = new Date(subtask.plannedStart);
                const subtaskPlannedEnd = new Date(subtask.plannedEnd);
                const subtaskActualStart = subtask.actualStart ? new Date(subtask.actualStart) : subtaskPlannedStart;
                const subtaskActualEnd = subtask.actualEnd ? new Date(subtask.actualEnd) : subtaskPlannedEnd;
    
                const subtaskTotalPlannedDays = (subtaskPlannedEnd - subtaskPlannedStart) / (1000 * 60 * 60 * 24);
    
                const subtaskStartOffset = (subtaskActualStart - subtaskPlannedStart) / (1000 * 60 * 60 * 24);
                const subtaskActualDuration = (subtaskActualEnd - subtaskActualStart) / (1000 * 60 * 60 * 24);
    
                const subtaskPlannedWidth = (subtaskTotalPlannedDays / 30) * 100; // Assuming each month has 30 days
                const subtaskActualWidth = (subtaskActualDuration / 30) * 100;
    
                const subtaskLeft = (subtaskStartOffset / 30) * 100; // Assuming each month has 30 days
    
                return {
                    id: subtask.id,
                    parentTask: task.parentTask, // Adiciona a parentTask da tarefa pai
                    status: 'subtarefa', // Indica que é uma subtarefa
                    planned: {
                        left: `${subtaskLeft}%`,
                        width: `${subtaskPlannedWidth}%`,
                        backgroundColor: randomColor(),
                    },
                    actual: {
                        left: `${subtaskLeft}%`,
                        width: `${subtaskActualWidth}%`,
                        backgroundColor: randomColor(), // Use uma cor diferente para subtarefas reais
                    }
                };
            });
            console.log('Subtask Bars for task id', task.id, subtaskBars);
            newSubtaskBars[task.id] = subtaskBars;
        });
    
        setBars(newBars);
        setSubtaskBars(newSubtaskBars);
    };
    const generateDates = () => {
        const today = new Date();
        const formattedDates = [];
        for (let i = -1; i < 29; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            formattedDates.push(formattedDate);
        }
        setDates(formattedDates);
    };

    useEffect(() => {
        generateDates();
    }, []);

    const toggleRow = (index) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const handleSubmit = (newSubtask) => {
        const updatedTasks = chartTasks.map(task => {
            if (task.parentTask === newSubtask.parentTask) {
                return { 
                    ...task, 
                    subtasks: [...(task.subtasks || []), newSubtask] 
                };
            }
            return task;
        });
    
        setChartTasks(updatedTasks);
        setShowSubtaskForm(false);
    };

    return (
        <div className="gantt-chart">
            <div className="gantt-chart-content">
                <div className="gantt-chart-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Subtask</th>
                                <th>Data planejada - Inicio</th>
                                <th>Data planejada - Final</th>
                                <th>Data Realizada - Inicio</th>
                                <th>Data Realizada - Final</th>
                                <th>Responsavel</th>
                                <th>Custo</th>
                                <th>Observação</th>
                                <th>Adicionar Subtask</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
    {chartTasks.map((task, index) => (
        <React.Fragment key={index}>
            <tr>
                <td>{task.parentTask}</td>
                <td>{task.subtask}</td>
                <td>{task.plannedStart}</td>
                <td>{task.plannedEnd}</td>
                <td>{task.actualStart}</td>
                <td>{task.actualEnd}</td>
                <td>{task.responsible}</td>
                <td>{task.cost}</td>
                <td>
                    <button onClick={() => toggleRow(index)}>
                        {expandedRows[index] ? "Esconder" : "Detalhes"}
                    </button>
                </td>
                <td>
                    <button onClick={() => handleAddSubtaskClick(task)}>
                        Adicionar Subtask
                    </button>
                </td>
            </tr>
            {showSubtaskForm && selectedParentTask === task && (
                <tr>
                    <td colSpan="12">
                        <SubtaskForm
                            parentTask={selectedParentTask}
                            onSubmit={handleSubmit}
                        />
                    </td>
                </tr>
            )}
            {expandedRows[index] && (
                <tr>
                    <td colSpan="12">
                        <div>
                            <strong>Observação:</strong> {task.observations}
                        </div>
                        <div>
                            <strong>Recursos:</strong> {task.resources}
                        </div>
                    </td>
                </tr>
            )}
            {task.subtasks && task.subtasks.map((subtask, subIndex) => (
                <tr key={`${index}-${subIndex}`}>
                    <td>{subtask.parentTask}</td>
                    <td>{subtask.subtask}</td>
                    <td>{subtask.plannedStart}</td>
                    <td>{subtask.plannedEnd}</td>
                    <td>{subtask.actualStart}</td>
                    <td>{subtask.actualEnd}</td>
                    <td>{subtask.responsible}</td>
                    <td>{subtask.cost}</td>
                    <td>{subtask.observations}</td>
                    <td>
                        <div className="gantt-chart-bar-container">
                            {subtaskBars[subtask.id] && (
                                <React.Fragment>
                                    <div className="gantt-chart-bar planned" style={subtaskBars[subtask.id].planned} />
                                    <div className="gantt-chart-bar actual" style={subtaskBars[subtask.id].actual} />
                                </React.Fragment>
                            )}
                        </div>
                    </td>
                </tr>
))}

        </React.Fragment>
    ))}
</tbody>
    </table>
                </div>
                <div className="gantt-chart-bars-container">
                <div className="gantt-chart-dates">
    {dates.map((date, index) => (
        <div key={index} className="gantt-chart-date">
            {date}
        </div>
    ))}
</div>
<div className="gantt-chart-bars">
{bars.map((bar, index) => (
    <div key={index} className="gantt-chart-bar-container">
        <div className="gantt-chart-bar planned" style={bar.planned}>
            <span className="bar-label">{bar.parentTask}</span> {/* Exibe o valor da parentTask */}
        </div>
        <div className="gantt-chart-bar actual" style={bar.actual}>
            <span className="bar-label">{bar.parentTask}</span> {/* Exibe o valor da parentTask */}
        </div>
        {subtaskBars[bar.id] && subtaskBars[bar.id].map((subtaskBar, subIndex) => (
            <React.Fragment key={`${index}-${subIndex}`}>
                <div className="gantt-chart-bar planned" style={{ ...subtaskBar.planned, ...{ transform: `${subtaskBar.planned.transform}` } }}>
                    <span className="bar-label">{subtaskBar.parentTask}</span> {/* Exibe o valor da parentTask */}
                </div>
                <div className="gantt-chart-bar actual" style={{ ...subtaskBar.actual, ...{ transform: `${subtaskBar.actual.transform}` } }}>
                    <span className="bar-label">{subtaskBar.parentTask}</span> {/* Exibe o valor da parentTask */}
                </div>
            </React.Fragment>
        ))}
    </div>
))}

</div>
                </div>
            </div>
        </div>
    );
};

export default GanttChart;

