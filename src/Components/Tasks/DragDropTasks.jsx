import React, {useState} from 'react';
import DragDropList from './utils/DragDropList'
import Grid from "@material-ui/core/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid"

const item1 = {
    id: v4(),
    description: "lavar trastes",
    duration: 30,
    time: 15.2
}

const item2 = {
    id: v4(),
    description: "salir a correr",
    duration: 45,
    time: 20
}

const item3 = {
    id: v4(),
    description: "yoga",
    duration: 15,
    time: 10
}

function Tasks() {

    const [state, setState] = useState({
        "todo": {
            title: "Tareas Por Hacer",
            items: [item1, item2]
        },
        "completed": {
            title: "Tareas Completadas",
            items: [item3]
        }
    })

    // droppableId para que el framework sepa a cual droppable nos referimos (en origen y en destino del drag y drop)
    return (
        <Grid container>
            <DragDropContext onDragEnd={e => console.log(e)}>
                {_.map(state, (data, key) => (
                <Grid item xs={12} md={6}>
                    <h3>{data.title}</h3>
                            <DragDropList 
                            name={data.title}
                            items={data.items}
                            listKey={key}
                            />
                 </Grid>
                ))}
            </DragDropContext>
        </Grid>
    )

}

export default Tasks