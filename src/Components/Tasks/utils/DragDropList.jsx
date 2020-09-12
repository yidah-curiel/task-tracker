import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import { Droppable, Draggable } from "react-beautiful-dnd";
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
        backgroundColor: '#ffc400',
    },
    completedItem: {
        backgroundColor: '#bdbdbd',
    }
});

function DraggableList({name, items, listKey, showCompleted}) {
    const classes = useStyles();

    console.log(items)
    console.log(listKey)

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
                                    className={
                                        listKey === "completed" ? 
                                        clsx(classes.listItem, classes.completedItem)
                                        : classes.listItem}>

                                            <TaskItem 
                                                listKey = {listKey}
                                                showCompleted={showCompleted}
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