import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Filters from './utils/Filters'
import {v4} from "uuid"


const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
    padding: theme.spacing(1),
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center'
  },
  button: {
    width: '100%'
  }
}));


function Toolbar({setTasks}) {
	const classes = useStyles();

	const [text, setText] = useState('')

	const addTask = () => {
		const newTask = {
			id: v4(),
			description: text,
		}
		setTasks(prev => {
			const prevTasks = {...prev}
			prevTasks["todos"].items.unshift(newTask)
			return prevTasks
		})
	}

	return (
		<Paper square className={classes.root}>
			<Grid container spacing={3} className={classes.container}>
				<Grid item xs={12} sm={6}>
					<Button variant="outlined" className={classes.button}>Nueva Tarea</Button>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Filters/>
				</Grid>
			</Grid>
		</Paper>
	);
}

export default Toolbar;
