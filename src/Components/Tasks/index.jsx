import React, {useState} from 'react';
import Toolbar from './Toolbar';
import Tasks from './DragDropTasks';
import Graphs from './Graphs';
import Grid from "@material-ui/core/Grid";
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


export default function () {

    const [tasks, setTasks] = useState({
        "todos": {
            title: "Tareas Por Hacer",
            items: [item1, item2]
        },
        "completed": {
            title: "Tareas Completadas",
            items: [item3]
        }
    })

    return (
        <Grid container spacing={2} style={{padding:'3% 5%'}}>
            <Grid item xs={12}>
                <Toolbar setTasks={setTasks}/>
            </Grid>
            <Grid item md={8} xs={12}>
                <Tasks tasks={tasks} setTasks={setTasks}/>
            </Grid>
            <Grid item md={4} xs={12}>
                <Graphs/>
            </Grid> 
        </Grid>
    )
}
