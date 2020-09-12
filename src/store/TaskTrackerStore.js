import React, { useState } from "react";
import TaskTrackerContext from "./createContext";
import { v4 } from "uuid";

const item1 = {
	id: v4(),
	description: "lavar trastes",
	duration: 30,
	countdown: 15,
	time: 28,
};

const item2 = {
	id: v4(),
	description: "salir a correr",
	duration: 45,
	countdown: 40,
	time: 45,
};

const item3 = {
	id: v4(),
	description: "yoga",
	duration: 15,
	countdown: 15,
	time: 10,
};

export default ({ children }) => {
	const [tasks, setTasks] = useState({
		todos: {
			title: "Por Hacer",
			items: [item1, item2],
		},
		completed: {
			title: "Completadas",
			items: [item3],
		},
	});

	const [showCompleted, setShowCompleted] = useState(true);
	const [taskInProgress, setTaskInProgress] = useState(false);
	const [taskCompleted, setTaskCompleted] = useState(false);

	const addTask = (newTask) => {
		setTasks((prev) => {
			// agregamos la task al principio de la lista de tareas pendientes
			const prevTasks = { ...prev };
			prevTasks["todos"].items.push(newTask);
			return prevTasks;
		});
	};

	const moveTask = (source, destination) => {
		const taskCopy = { ...tasks[source.droppableId].items[source.index] };
		setTasks((prev) => {
			// copiamos el estado anterior de tareas
			const prevTasks = { ...prev };
			// borramos la tarea que estamos moviendo de su lugar de origen
			prevTasks[source.droppableId].items.splice(source.index, 1);
			// insertamos la tarea que estamos moviendo en su lugar de destino
			prevTasks[destination.droppableId].items.splice(
				destination.index,
				0,
				taskCopy
			);
			// seteamos estas nuevas listas de tareas
			return prevTasks;
		});
	};

	const deleteTask = (key, index) => {
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks[key].items.splice(index, 1);
			return prevTasks;
		});
	};

	const resetTask = (key, index) => {
		const newItem = { ...tasks[key].items[index] };
		newItem.countdown = newItem.duration;
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks[key].items[index] = newItem;
			return prevTasks;
		});
	};

	const editTask = (key, index, props) => {
		const newItem = { ...tasks[key].items[index], ...props };
		console.log(newItem);
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks[key].items[index] = newItem;
			return prevTasks;
		});
	};

	const finalizeTask = (key, index) => {
		const taskCopy = { ...tasks[key].items[index] };
		setTasks((prev) => {
			// copiamos el estado anterior de tareas
			const prevTasks = { ...prev };
			// borramos la tarea que estamos finalizando de la lista todos
			prevTasks[key].items.splice(index, 1);
			// insertamos la tarea al final de la lista completed
			prevTasks["completed"].items.unshift(taskCopy);
			// seteamos estas nuevas listas de tareas
			return prevTasks;
		});
		setShowCompleted(true)
		setTaskCompleted(true)
	};

	return (
		<TaskTrackerContext.Provider
			value={{
				tasks,
				showCompleted,
				setShowCompleted,
				setTasks,
				addTask,
				moveTask,
				deleteTask,
				resetTask,
				editTask,
				finalizeTask,
				taskInProgress, 
				setTaskInProgress,
				taskCompleted, 
				setTaskCompleted
			}} //variables seteadas para usarse donde sea :v
		>
			{children}
		</TaskTrackerContext.Provider>
	);
};
