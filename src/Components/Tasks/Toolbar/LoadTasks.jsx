import React, {useContext} from "react";
import Button from "@material-ui/core/Button";
import {TaskTrackerContext} from '../../../store/TaskTrackerStore';
import Faker from 'faker'
import { v4 } from "uuid";

const LoadTasks = () => {
    const { loadTasks } = useContext(TaskTrackerContext);


    const genTasks = () => {
        let newTasks = []
        let today = new Date()
        let endDay = today.getDate()
        let endMonth = today.getMonth()
        let startDay = endDay - 6
        let startMonth = endMonth
        let endYear = today.getFullYear()
        
         // if we are less than 7 days into the week, we need to set the start info for last month
        if (endDay < 7) {
            // negDays is how many days I need to pull from the previous month to complete the week
            let negDays = 7 - endDay
            // if you provide 0 as day you get the last day of the previous month
            let lastDate = new Date(endYear, endMonth, 0)

            // set start day and month to 7 days ago
            startDay = lastDate.getDate() - negDays
            startMonth = lastDate.getMonth()
        }

        for (var i=0; i <= 50; i++) {
            let ranDate = new Date(endYear, endMonth, getRandomNumber(startDay, endDay))
            let ranDur = getRandomNumber(1,120)

            let newTask = {
                id: v4(),
                description: Faker.lorem.words(),
                duration: ranDur,
                countdown: {
                    mins: 0,
                    secs: 0,
                },
                time: {
                    mins: getRandomNumber(Math.floor(ranDur*.8), ranDur), // random between 80% of duration and duration+1
                    secs: 0,
                },
                completed: ranDate // random between last week and tomorrow
            };
            
            newTasks.push(newTask)
        }

        loadTasks(newTasks)
            
        }
            // create task obj
            /*
            {
                id: v4(),
                description: "salir a correr", // lorem ipsum
                duration: 45, // random between 1 & 121
                countdown: {
                    mins: 0,
                    secs: 0,
                },
                time: {
                    mins: 0, // random between 80% of duration and duration+1
                    secs: 0,
                },
                completed: null // random between last week and tomorrow
            };
            */


    // Returns a random number between min and max
   const getRandomNumber = (min, max) => {
       return Math.floor(Math.random() * (max - min + 1)) + min;
   }

	return (
		<Button
			color="primary"
			size="small"
			variant="outlined"
            disableElevation
            onClick={genTasks}
			style={{ textTransform: "none", marginTop:"2%", fontSize: "12px" }}
		>
			Cargar Tareas de Prueba
		</Button>
	);
};

export default LoadTasks;
