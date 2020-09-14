import React, { useState, createContext } from "react";
import { v4 } from "uuid";

const item1 = {
	id: v4(), // para identificar la tarea
	description: "lavar trastes", 
	duration: 30, // duracion estimada de la tarea
	countdown: { // tiempo en temporizador de esta tarea (tiempo restante en la tarea)
		mins: 0,
		secs: 3,
	}, // tiempo que se tomo en finalizar la tarea
	time: {
		mins: 0,
		secs: 0,
	},
};

const item2 = {
	id: v4(),
	description: "salir a correr",
	duration: 45,
	countdown: {
		mins: 40,
		secs: 3,
	},
	time: {
		mins: 0,
		secs: 0,
	},
};

const item3 = {
	id: v4(),
	description: "yoga",
	duration: 15,
	countdown: {
		mins: 0,
		secs: 0,
	},
	time: {
		mins: 10,
		secs: 0,
	},
};

export const TaskTrackerContext = createContext();

const TaskTrackerProvider = ({ children }) => {
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

	// minutos y segundos que desplegaremos en temporizador 
	// y usaremos para manejar el countdown de las tareas
	const [timerMinutes, setTimerMinutes] = useState(0);
	const [timerSeconds, setTimerSeconds] = useState(0);
	
	// showCompleted maneja el despliege de las tareas 'completed' 
	const [showCompleted, setShowCompleted] = useState(true);
	// showCompleted maneja el despliege de las graficas
	const [showGraphs, setShowGraphs] = useState(true);
	
	// si taskInProgress es true, significa que el timer esta corriendo en la tarea todos.items[0]
	const [taskInProgress, setTaskInProgress] = useState(false);
	// si taskCompleted es true, significa que la tarea completed.items[0] se acaba de finalizar
	const [taskCompleted, setTaskCompleted] = useState(false);

	

	const addTask = (newTask) => {
		setTasks((prev) => {
			// agregamos la task al final de la lista de tareas pendientes
			const prevTasks = { ...prev };
			prevTasks["todos"].items.push(newTask);
			return prevTasks;
		});
	};

	const dropTask = (source, destination) => {
		// si estamos moviendo una tarea a todo desde completed, creamos una nueva tarea
		// igual a esta con nuevo id (y time en 0s) para ingresarla en todos y mantener la original en 'completed'
		if (
			source.droppableId === "completed" &&
			destination.droppableId === "todos"
		) {
			const newTodo = {
				...tasks["completed"].items[source.index],
				id: v4(),
				time: {
					mins: 0,
					secs: 0,
				},
			};
			let newIndex = destination.index;
			// si tenemos una tarea en proceso, solo se puede ingresar el todo a partir del indice 1
			if (taskInProgress && destination.index === 0) {
				newIndex = 1;
			}
			setTasks((prev) => {
				// copiamos el estado anterior de tareas
				const prevTasks = { ...prev };
				// insertamos la tarea que estamos moviendo en su lugar de destino
				prevTasks["todos"].items.splice(newIndex, 0, newTodo);
				// seteamos estas nuevas listas de tareas
				return prevTasks;
			});
		}
		 else {
			const taskCopy = { ...tasks[source.droppableId].items[source.index] };
			
			if (
				source.droppableId === "todos" &&
				destination.droppableId === "completed"
				){	
				// si estamos finalizando una tarea (moviendola de todos a completed)
				// debemos primero setear el tiempo que se tomo en finalizar dicha tarea
					setTimeComplete(taskCopy)
			}

			const newIndex = destination.index;
			// si tenemos una tarea en proceso, solo se puede ingresar el 'todo' a partir del indice 1
			if (
				taskInProgress &&
				destination.droppableId === "todos" &&
				destination.index === 0
			) {
				newIndex = 1;
			}
			setTasks((prev) => {
				// copiamos el estado anterior de tareas
				const prevTasks = { ...prev };
				// borramos la tarea que estamos moviendo de su lugar de origen
				prevTasks[source.droppableId].items.splice(source.index, 1);
				// insertamos la tarea que estamos moviendo en su lugar de destino
				prevTasks[destination.droppableId].items.splice(newIndex, 0, taskCopy);
				// seteamos estas nuevas listas de tareas
				return prevTasks;
			});
		}
	};

	// boramos el task de los 'todos', usando index como referencia a la tarea
	const deleteTask = (index) => {
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks["todos"].items.splice(index, 1);
			return prevTasks;
		});
	};

	// reseteamos el countdown de la tarea en 'todos' a la duracion de esta tarea
	const resetTask = (index) => {
		const newItem = { ...tasks["todos"].items[index] };
		newItem.countdown = {mins: newItem.duration, secs: 0}
		
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks["todos"].items[index] = newItem;
			return prevTasks;
		});

		// si la tarea que estamos reseteando esta en curso, reseteamos el temporizador
		if (index === 0 && taskInProgress) {
			setTimerMinutes(newItem.duration);
			setTimerSeconds(0);
		}
	};

	// editamos tarea en 'todos' con los nuevos props
	const editTask = (key, index, props) => {
		const newItem = { ...tasks[key].items[index], ...props };
		
		/* si la nueva duracion es mayor a la anterior,
		reseteamos el countdown para tomar en cuenta la nueva duracion */
		if (newItem.duration > tasks[key].items[index].duration) {
			// le agregamos al countdown la diferencia entre la duracion anterior y la nueva
			newItem.countdown.mins = parseInt(newItem.countdown.mins) + 
									 (newItem.duration - tasks[key].items[index].duration) 
		}

		/* si la nueva duracion es menor a la anterior,
		reseteamos el countdown para ser igual a la nueva duracion */
		if (newItem.duration < tasks[key].items[index].duration) {
			newItem.countdown = {mins:newItem.duration, secs:0}
		}

		console.log(newItem);
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks[key].items[index] = newItem;
			return prevTasks;
		});
	};

	// funcion que corremos para finalizar una tarea (solo mediante el timer o el boton de finalizar)
	const finalizeTask = (index) => {
		const taskCopy = { ...tasks['todos'].items[index] };

		// registramos el tiempo que se tomó en terminar esta tarea
		setTimeComplete(taskCopy)

		// si la tarea que estamos finalizando es la que estaba en curso, se corta el progresso
		if (index === 0 && taskInProgress) {
			setTaskInProgress(false);
		}

		// mandamos la tarea de 'todos' a 'complete'

		// copiamos el estado anterior de tareas
		const newTasks = { ...tasks };
		// borramos la tarea que estamos finalizando de la lista todos
		newTasks['todos'].items.splice(index, 1);
		// insertamos la tarea al final de la lista completed
		newTasks["completed"].items.unshift(taskCopy);
		// seteamos estas nuevas listas de tareas
		setTasks(newTasks);
		
		setShowCompleted(true);
		setTaskCompleted(true)
		setTimeout(() => setTaskCompleted(false),3000)
	};

	// para empezar una tarea pasamos el index de la tarea que queremos empezar
	const startTask = (index) => {
		// si ya hay una tarea en curso, la pausamos 
		if(taskInProgress){
			pauseTask()
		}
		// si no es la primer tarea de la lista todos, la metemos al prinicipio de la lista todos
		// copiamos, quitamos y metemos la tarea en cuestion
		if (index !== 0) {
			// copiamos, quitamos y metemos la tarea en cuestion 
			const taskCopy = { ...tasks["todos"].items[index] };

			const newTasks = { ...tasks };
				newTasks["todos"].items.splice(index, 1);
				newTasks["todos"].items.unshift(taskCopy);
			setTasks(newTasks);
		}
		// seteamos el temporizador al countdown del primer item en todos
		// tasks['todos'].items[0] siempre debe ser la tarea en curso
		setTimerMinutes(tasks['todos'].items[0].countdown.mins)
		setTimerSeconds(tasks['todos'].items[0].countdown.secs)

		setTaskInProgress(true);
	};

	// funcion que cambia el countdwon de la tarea en curso al tiempo actual del timer
	const setCountdown = () => {
		// copiamos y cambiamos el countdown de la tarea en curso al tiempo en el temporizador
		const newItem = 
		{ ...tasks["todos"].items[0], 
			countdown: {
				mins: timerMinutes, 
				secs: timerSeconds
			} 
		};

		// copiamos las tareas y metemos la tarea en curso actualizada en su lugar respectivo (todos.items[0])
		const newTasks = {...tasks}
		newTasks["todos"].items[0] = newItem;
		setTasks(newTasks);
	};

	const pauseTask = () => {
		setTaskInProgress(false);
	};

	// funcion que calcula el tiempo que se tardo en finalizar una tarea
	// restando el tiempo en el countdown de la task del tiempo en la duracion de la misma task
	const setTimeComplete = (task) => {
		let newMins = 0
		let newSecs = 0
		// estos seran los tiempos que se tomo en finalizar la tarea

		if (task.countdown.secs === 0) {
			// si los segundos en el countdown estan en 0s, solo restamos los minutos
			newMins = task.duration - task.countdown.mins
		} else {
			
			// si los minutos no estan en 0, tendremos que restar 1 minuto adicional, o dejar los minutos en 0
			if (task.duration - task.countdown.mins > 2) {
				newMins = task.duration - task.countdown.mins -1
			}

			// restamos los segundos del countdown de los segundos en un minuto
			// para calcular los segundos que se tardo en finalizar
			newSecs = 60 - task.countdown.secs
		}
		
		// metemos esta resta como el nuevo 'time' de nuestra task
		task.time = {mins: newMins, secs: newSecs}
	}

	
	return (
		<TaskTrackerContext.Provider
			value={{
				tasks,
				timerMinutes,
				setTimerMinutes,
				timerSeconds,
				setTimerSeconds,
				showCompleted,
				setShowCompleted,
				setTasks,
				addTask,
				dropTask,
				deleteTask,
				resetTask,
				editTask,
				finalizeTask,
				taskInProgress,
				setTaskInProgress,
				taskCompleted,
				setTaskCompleted,
				startTask,
				pauseTask,
				showGraphs,
				setShowGraphs,
				setCountdown
			}} //variables seteadas para usarse donde sea :v
		>
			{children}
		</TaskTrackerContext.Provider>
	);
};

export default TaskTrackerProvider;
