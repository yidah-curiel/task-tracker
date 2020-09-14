import React, {useContext} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TaskTrackerContext } from "../../../store/TaskTrackerStore";
import ListItem from '@material-ui/core/ListItem';
import TaskItem from './TaskItem';
import clsx from 'clsx';

const useStyles = makeStyles({
    listItem: { 
        backgroundColor: '#a5d6a7',
        marginBottom: 5,
        borderRadius: 7
    },
    inProgressItem: {
        backgroundColor: '#daa520',
    },
    completedItem: {
       // backgroundColor: '#d32f2f',

    },
    completeItem: {
        backgroundColor: '#bdbdbd',
    }
});

function DraggableList({name, items, listKey}) {
    const classes = useStyles();

    const {
        taskInProgress
      } = useContext(TaskTrackerContext);

    const listItemClasses = (index) => {        
        if (listKey === "todos") { 
            if (index === 0 && taskInProgress){
                return clsx(classes.listItem, classes.inProgressItem)
            } else {
                return classes.listItem
            }
        } else {
                return clsx(classes.listItem, classes.completeItem)
            }
    }
    
    // Droppables son las zonas donde se podran dejar (hacer drop) los Draggables (listItems) */
    // droppableId para saber a cuall Droppable nos referimos (en este caso son "completed" y "todos") siempre deben ser strings
    return (  
        <Droppable droppableId={listKey}> 
            {/* The React children of a <Droppable /> must be a function that returns a ReactElement. */}
            {(provided) => (  // la funcion dentro de un Droppable viene con 2 parametros (provided y snapshot)
                <List
                    dense  
                    ref={provided.innerRef} //  you must bind the provided.innerRef to the highest possible DOM node in the ReactElement
                    {...provided.droppableProps} //This is an Object that contains properties that need to be applied to a Droppable element. It needs to be applied to the same element that you apply provided.innerRef to. It currently contains data attributes that we use for styling and lookups.
                    aria-label={name}>
                    {/* Draggables son los elementos que se pueden recoger y mover (draggear) */}
                    {items.map(((el, index) => (
                        // el id del elemento (tarea) se usa como draggableID para tener referencia del draggable al momento de moverlo
                        <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided) => ( // parametro provider viene del HOC Draggable (similar a Droppable)
                                <ListItem
                                    ref={provided.innerRef}
                                    //draggableProps les da la habilidad de draggear a los elementos
                                    {...provided.draggableProps} 
                                     // dragHandleProps asignan la seccion del elemento por el que se puede recoger (todo el elemento ListItem se puede usar en este caso)
                                    {...provided.dragHandleProps} 
                                    className={listItemClasses(index)}>

                                            <TaskItem 
                                                listKey={listKey}
                                                task={el}
                                                index={index}
                                                />
                                        
                                </ListItem>
                            )}
                        </Draggable>
                    )))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    )
}

export default DraggableList