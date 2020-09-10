import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import { Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#27c2c7',
        width: '90%'
    },
});

function DraggableList({name, items, listKey}) {
    const classes = useStyles();

    console.log(items)
    console.log(listKey)
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
                                    {...provided.dragHandleProps}>
                                        {el.description}
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