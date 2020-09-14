import React, {useState, useContext, useEffect} from 'react';
import LineGraph from './LineGraph'
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {TaskTrackerContext} from '../../../store/TaskTrackerStore';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		padding: theme.spacing(1),
		"& > *": { // style applied to all child elements of root
			margin: theme.spacing(1),
			width: '100%',
			alignItems: "center"
		},
	},
}));

function Graphs() {
    const classes = useStyles();

    const { tasks } = useContext(TaskTrackerContext);
    const [labels, setLabels] = useState([])
    const [dataset, setDataset] = useState([])

    useEffect(() => {
        setLineData()
    }, [tasks])

    const setLineData = () => {
        let today = new Date()
        let endDay = today.getDate()
        let endMonth = today.getMonth()
        let startDay = endDay - 6
        let startMonth = endMonth
        let lastDate

        let tasksCompleted = []
        let taskTotals = []
        let taskDates = []
        
         // if we are less than 7 days into the week, we need to set the start info for last month
        if (endDay < 7) {
            // negDays is how many days I need to pull from the previous month to complete the week
            let negDays = 7 - endDay
            let endYear = today.getFullYear()
            // if you provide 0 as day you get the last day of the previous month
            lastDate = new Date(endYear, endMonth, 0)

            // set start day and month to 7 days ago
            startDay = lastDate.getDate() - negDays
            startMonth = lastDate.getMonth()
        }


        // map completed items to filter for all items completed in the last 7 days
        tasks.completed.items.forEach(task => {
            let compDay = task.completed.getDate()
            let compMonth = task.completed.getMonth()

            // checks if task was completed in last 7 days
            if ((compMonth === startMonth && compDay > startDay)
                    || (compMonth === endMonth && compDay < endDay)) {
                        // counts tasks completed on this day, with the day they were completed as the index
                        if (tasksCompleted[compDay] === undefined) {
                            tasksCompleted[compDay] = 1
                        } else {
                            tasksCompleted[compDay] ++
                        }
                    }    
        })

        /* funtion that will map tasksCompleted array with given start and stop day,
         and what month we are looping through, to add data to final data arrays taskTotals and taskDates*/
        const mapData = (startDay, lastDay, month=endMonth) => {
            for (var i=startDay; i <= lastDay; i++) {
                if (tasksCompleted[i] !== undefined) {
                    taskTotals.push(tasksCompleted[i])
                } else { taskTotals.push(0)}
                // the index is the date it was completed and we add 1 to month since months are 0 based (11 is december, etc)
                taskDates.push(`${i}/${month+1}`)
            }
        }
        /* function that adds taskTotals and taskDatest
        if we have to pull days from the previous month, we have to loop tasksCompleted array twice 
        (through previous month days and this month) */
        if (startMonth !== endMonth) {
            mapData(startDay, lastDate.getDate(), startMonth)
            mapData(1, endDay, endMonth)
        } 
        else {
            // if we are more than a week into the month, we map only this month's last 7 days
            mapData(startDay, endDay)
        }

        setDataset(taskTotals)
        setLabels(taskDates)
    }
    
    return (    
        <Paper variant="outlined" className={classes.root}>
            <LineGraph
                labels={labels}
                dataset={dataset}
            />
        </Paper>
    )
}

export default Graphs