import React from 'react';
import Toolbar from './Toolbar';
import Tasks from './DragDropTasks';
import Graphs from './Graphs';
import Grid from "@material-ui/core/Grid";


export default function () {

    return (
        <Grid container spacing={2} style={{padding:'3% 5%'}}>
            <Grid item xs={12}>
                <Toolbar/>
            </Grid>
            <Grid item md={8} xs={12}>
                <Tasks/>
            </Grid>
            <Grid item md={4} xs={12}>
                <Graphs/>
            </Grid> 
        </Grid>
    )
}
