import React, {useState, useEffect} from 'react';
import AddTaskBar from './Toolbar';
import TasksDragDrop from './TasksDragDrop';
import Graphs from './Graphs';
import Grid from "@material-ui/core/Grid";
import TaskTrackerContext from '../../store/createContext';


export default function () {

    const { tasks } = React.useContext(TaskTrackerContext);
    const [showGraphs, setShowGraphs] = useState(true)


    return (
        <Grid container spacing={2} style={{padding:'3% 5%'}}>
            <Grid item xs={12}>
                <AddTaskBar/>
            </Grid>
            <Grid item md={showGraphs ? 8 : 12} xs={12}>
         {tasks &&  <TasksDragDrop tasks={tasks}/> }
            </Grid>
            {showGraphs && <Grid item md={4} xs={12}>
                <Graphs/>
            </Grid> }
        </Grid>
    )
}
