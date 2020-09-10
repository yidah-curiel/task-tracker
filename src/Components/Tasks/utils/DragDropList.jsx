import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import { Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';

const useStyles = makeStyles({
    root: {
      //  backgroundColor: '#deb887',
      //  width: '90%'
    },
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

function DraggableList({name, items, listKey}) {
    const classes = useStyles();

    console.log(items)
    console.log(listKey)

    // droppableId para que el framework sepa a cual droppable nos referimos (en origen y en destino del drag y drop)
    return (
        <Droppable droppableId={listKey}> 
            {(provided) => (  
                <List  
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classes.root} 
                    aria-label={name}>
                    {items.map(((el, index) => (
                        <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided) => (
                                <ListItem
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={
                                        listKey === "completed" ? 
                                        clsx(classes.listItem, classes.completedItem)
                                        : classes.listItem}>
                                        {el.description} {el.duration}
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