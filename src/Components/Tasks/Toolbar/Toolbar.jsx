import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import {TaskTrackerContext} from '../../../store/TaskTrackerStore';
import { v4 } from "uuid";
//import TextField from "./utils/ui/TextField";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from '@material-ui/core/MenuItem';
import LoadTasks from './LoadTasks'

const inputStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
        padding: theme.spacing(1),
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
		padding: theme.spacing(1),
		"& > *": { // style applied to all child elements of root
			margin: theme.spacing(1),
			width: '100%',
			alignItems: "center"
		},
	},
	buttons: {
		display: 'flex',
		flexDirection: 'column'
	}
}));

const Duraciones = [
	{ value: "", label: "" },
	{ value: 30, label: "Corta (30 min)" },
	{ value: 45, label: "Media (45 min)" },
	{ value: 60, label: "Larga (1 hr)" },
	{ value: 'other', label: "Otra"}
];

function Toolbar() {
	const classes = useStyles();
	const inputClasses = inputStyles()

	const { addTask } = useContext(TaskTrackerContext);

	const [description, setDescription] = useState('')
	const [duration, setDuration] = useState('')
	const [custDuration, setCustDuration] = useState(false)
	const [descriptionError, setDescriptionError] = useState(false)
	const [durationError, setDurationError] = useState(false)

	// handles form validation
	const handleSubmit = () => {
		// if form is valid, adds new task
		if (duration && description.length) {
			submitTask()
		} else {
			// sets corresponding error messages for invalid fields
			if (!description.length)  {
				setDescriptionError(true)
			}
			if (!duration)  {
				setDurationError(true)
			}
		}		
	}

	const submitTask = () => {
		// if there were previous error msgs, removes them
		if(descriptionError || durationError) {
			setDescriptionError(false)
			setDurationError(false)
		}
		// creates new task with input info
		const newTask = {
			id: v4(),
			description,
			duration,
			countdown: {
				mins: duration,
				secs: 0,
			},
			time: {
				mins: 0,
				secs: 0,
			},
		};
		// adds new task and resets the input field values
		addTask(newTask)
		setDescription('')
		setDuration('')
		setCustDuration(false)
	}

	// if 'other' duration is selected, show custDuration input
	useEffect(() => {
		if (duration === 'other') {
			setCustDuration(true)
			setDuration(15)
		}
	}, [duration])


	return (
		<Paper square className={classes.root}>
			<Grid container spacing={3}>

				{/* Description input field */}
				<Grid item md={6}>
					<FormControl error={descriptionError} className={inputClasses.root}>
						<TextField
							label={"Nueva Tarea"}
							id={"nueva-tarea-descripcion"}
							name="description"
							value={description}
							onChange={(e)=>setDescription(e.target.value)} //{handleInputChange}
							error={descriptionError}
							required={true}
							InputLabelProps={{
								shrink: true,
							}}
						>
						</TextField>
						{descriptionError ? (
							<FormHelperText id={"error-en-nueva-tarea-descripcion"}>{"Descripci??n de tarea requerida"}</FormHelperText>
						) : null}
					</FormControl>
				</Grid>

				{/* Duration input field */}
				<Grid item md={4}>
				<FormControl error={durationError} className={inputClasses.root}>
				{/* if custDuration was selected, show input option, 
				else show default select options */}
				{custDuration 
					?
					<TextField
						label={"Duraci??n (minutos)"}
						id={"nueva-tarea-duracion"}
						name="duration"
						type="number"
						value={duration}
						onChange={(e)=>setDuration(e.target.value)}
						error={durationError}
						required={true}
						InputLabelProps={{
							shrink: true,
						}}
						InputProps={{
							inputProps: { 
								max: 120, min: 1 
							}
						}}
					>
					</TextField>
					: 
					<TextField
						label={"Duraci??n"}
						id={"nueva-tarea-duracion"}
						name="duration"
						select
						value={duration}
						onChange={(e)=>setDuration(e.target.value)}
						error={durationError}
						required={true}
						InputLabelProps={{
							shrink: true,
						}}
					>
						{Duraciones.map(option => (
						 <MenuItem key={option.value} value={option.value}>
                         	{option.label}
						</MenuItem>
						 ))}
					</TextField> 
					
				}
				{durationError ? (
							<FormHelperText id={"error-en-nueva-tarea-duracion"}>{"Duraci??n de tarea requerida"}</FormHelperText>
						) : null}
				</FormControl>
				
				</Grid>
				<Grid item md={2} className={classes.buttons}>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						startIcon={<AddIcon/>}
					>
						Agregar Tarea
					</Button>
					<LoadTasks/>
				</Grid>
				
			</Grid>
		</Paper>
	);
}

export default Toolbar;
