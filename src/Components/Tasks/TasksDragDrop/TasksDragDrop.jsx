import React, {useContext} from 'react';
import DragDropList from './DragDropList'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { DragDropContext } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import {TaskTrackerContext} from '../../../store/TaskTrackerStore';
import Button from "@material-ui/core/Button";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
        paddingLeft: '2%',
        display: 'flex',
        padding: '0% 2%',
        alignItems: 'center'
    },
    listContainer: {
        backgroundColor: '#e0e0e0',
        padding: '0% 2%',
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


function Tasks() {

    const classes = useStyles();
    
    const { tasks, dropTask, showCompleted, setShowCompleted } = useContext(TaskTrackerContext);

    const handleTasksView = () => {
        setShowCompleted(prev => !prev)
    }


    // valida el drag and drop mueve el task de su origen a su destino 
    const onDragEnd = ({destination, source}) => {

        // destination es null si el drop destino esta fuera de un droppable
        if(!destination) {
            return
        }
        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            console.log('dropped in same place')
        }
        // copiamos la tarea que estamos moviendo (usando su ubicacion de origen)
        dropTask(source, destination)
    }


    return (
        <Paper variant="outlined" className={classes.root}>
            <Grid container>
                 {/* El contexto donde se podra hacer el DragDrop */}
                <DragDropContext onDragEnd={onDragEnd}>
                    <Grid item container xs={12} className={classes.headerContainer}>    
                        <Grid item xs={6}>
                            <h3>Tareas</h3>
                        </Grid>
                        <Grid item xs={6} style={{textAlign: 'end'}}> 
                            <Button 
                                onClick={handleTasksView}
                                endIcon={showCompleted ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                            >
                                {showCompleted ? 
                                    "cerrar tareas realizadas"
                                    : 
                                    "ver tareas realizadas"}
                            </Button>
                        </Grid>
                    </Grid>
                     {/* El container de la lista tareas por hacer 
                     estilos diferentes cuando mostramos la lista de tareas terminadas y cuando no*/}
                    <Grid 
                        item 
                        container 
                        className={showCompleted ? 
                            clsx(classes.listContainer, classes.halfListContainer) 
                            : classes.listContainer}
                        >
                        <h5>{"Pendientes"}</h5>
                            {/* DragDropList contiene el 
                            Droppable - Para la zona donde se pueden dejar los elementos Draggables
                            Draggable - El wrapper del elemento que se podra recoger y mover dentro/hacia una zona Draggable
                            para crear la lista DragDrop */}
                                <DragDropList 
                                showCompleted={showCompleted}
                                name={"Por Hacer"}
                                items={tasks.todos.items}
                                listKey={"todos"}
                                key={"todos"}
                                />
                    </Grid>
                     {/* El container de la lista tareas terminadas */}
                    {showCompleted &&
                    <Grid item container className={clsx(classes.listContainer, classes.halfListContainer, classes.completedList)}>
                        <h5>{"Terminadas"}</h5>
                                <DragDropList 
                                showCompleted={true}
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