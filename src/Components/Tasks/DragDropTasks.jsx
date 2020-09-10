import React, {useState} from 'react';
import DragDropList from './utils/DragDropList'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		padding: theme.spacing(1),
		"& > *": {
			margin: theme.spacing(1),
		},
    },
    headerContainer: {
        paddingLeft: '2%'
    },
    listContainer: {
        backgroundColor: '#e0e0e0',
        padding: '0% 5%',
        flexDirection: 'column',
        margin: '2%',
        borderRadius: 10,
        width: '98%',
    },
    halfListContainer: {
        [theme.breakpoints.up('sm')]: {
            width: '46%'
        }
    },
    completedList: {
        backgroundColor: '#9e9e9e'
    }
}));


function Tasks({tasks, setTasks}) {
    const classes = useStyles();
    const [showCompleted, setShowCompleted] = useState(true)

    const handleTasksView = () => {
        setShowCompleted(prev => !prev)
    }

    const onDragEnd = ({destination, source}) => {
        console.log("from", source)
        console.log("to", destination)
        // destination es null si el drop destino esta fuera de un droppable
        if(!destination) {
            return
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            console.log('dropped in same place')
        }
        // copiamos la tarea que estamos moviendo (usando su ubicacion de origen)
        const taskCopy = {...tasks[source.droppableId].items[source.index]} 
        setTasks(prev => {
            // copiamos el estado anterior de tareas
            const prevTasks = {...prev}
            // borramos la tarea que estamos moviendo de su lugar de origen
            prevTasks[source.droppableId].items.splice(source.index, 1)
            // insertamos la tarea que estamos moviendo en su lugar de destino
            prevTasks[destination.droppableId].items.splice(destination.index, 0, taskCopy)            
            // seteamos estas nuevas listas de tareas
            return prevTasks
        })

    }

    return (
        <Paper variant="outlined" className={classes.root}>
            <Grid container>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid item xs={12} className={classes.headerContainer}>    
                        <h3>Tareas</h3>
                        <button onClick={handleTasksView}>
                            {!showCompleted ? 
                                "ver tareas realizadas"
                                : 
                                "cerrar tareas realizadas"}
                        </button>
                    </Grid>
                    <Grid 
                        item container 
                        className={showCompleted ? 
                            clsx(classes.listContainer, classes.halfListContainer) 
                            : classes.listContainer}
                        >
                        <h5>{"Pendientes"}</h5>
                                <DragDropList 
                                name={"Por Hacer"}
                                items={tasks.todos.items}
                                listKey={"todos"}
                                key={"todos"}
                                />
                    </Grid>
                    {showCompleted &&
                    <Grid item container className={clsx(classes.listContainer, classes.halfListContainer, classes.completedList)}>
                        <h5>{"Terminadas"}</h5>
                                <DragDropList 
                                name={"Completadas"}
                                items={tasks.completed.items}
                                listKey={"completed"}
                                key={"completed"}
                                />
                    </Grid>
                    }
                </DragDropContext>
            </Grid>
        </Paper>
    )

}

export default Tasks