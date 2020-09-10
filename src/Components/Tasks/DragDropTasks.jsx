import React from 'react';
import DragDropList from './utils/DragDropList'
import Grid from "@material-ui/core/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";


function Tasks({tasks, setTasks}) {

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
        <Grid container>
            <DragDropContext onDragEnd={onDragEnd}>
                {_.map(tasks, (data, key) => (
                <Grid item xs={12} md={6} key={key}>
                    <h3>{data.title}</h3>
                            <DragDropList 
                            name={data.title}
                            items={data.items}
                            listKey={key}
                            key={key}
                            />
                 </Grid>
                ))}
            </DragDropContext>
        </Grid>
    )

}

export default Tasks