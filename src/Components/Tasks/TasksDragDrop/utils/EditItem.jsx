import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {TaskTrackerContext} from '../../../store/TaskTrackerStore';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


const inputStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
     //   padding: theme.spacing(1),
        width: "100%",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	//	padding: theme.spacing(1),
		"& > *": { // style applied to all child elements of root
		//	margin: theme.spacing(1),
			width: '100%',
			alignItems: "center"
		},
	},
	button: {
	//	width: "100%",
	},
}));


function EditItem(key, index, description, duration) {
	const classes = useStyles();
	const inputClasses = inputStyles()

	const { editTask } = useContext(TaskTrackerContext);

	const [inputDescription, setDescription] = useState('')
	const [inputDuration, setDuration] = useState('')

	const handleSubmit = () => {
		editTask(key, index, {description, duration})
	}

    useEffect (() => {
        setDescription(description)
        setDuration(duration)
    }, [])


	return (
		<Paper square className={classes.root}>
			<Grid container spacing={3}>
				<Grid item md={6}>
					<FormControl className={inputClasses.root}>
						<TextField
							label={"Nueva Tarea"}
							id={"nueva-tarea-descripcion"}
							name="description"
							value={inputDescription}
							onChange={(e)=>setDescription(e.target.value)} //{handleInputChange}
							required={true}
							InputLabelProps={{
							//	shrink: true,
							}}
						>
						</TextField>

					</FormControl>
				</Grid>
				<Grid item md={4}>
				<FormControl className={inputClasses.root}>
					<TextField
						label={"Duración (minutos)"}
						id={"nueva-tarea-duracion"}
						name="duration"
						type="number"
						value={inputDuration}
						onChange={(e)=>setDuration(e.target.value)}
						required={true}
						InputLabelProps={{
						//	shrink: true,
						}}
						InputProps={{
							inputProps: { 
								max: 120, min: 1 
							}
						}}
					>
					</TextField>

				</FormControl>
				
				</Grid>
				<Grid item md={2}>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={handleSubmit}
					>
						Editar
					</Button>
				</Grid>
				
			</Grid>
		</Paper>
	);
}

export default EditItem;
