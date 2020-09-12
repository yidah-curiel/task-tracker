import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TaskTrackerContext from '../../store/createContext';
import { v4 } from "uuid";
//import TextField from "./utils/ui/TextField";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from '@material-ui/core/MenuItem';


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
	button: {
	//	width: "100%",
	},
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

	const { addTask } = React.useContext(TaskTrackerContext);

	const [description, setDescription] = useState('')
	const [duration, setDuration] = useState('')
	const [custDuration, setCustDuration] = useState(false)
	const [descriptionError, setDescriptionError] = useState(false)
	const [durationError, setDurationError] = useState(false)

	const handleSubmit = () => {
		if (duration && description.length) {
			submitTask()
		} else {
			if (!description.length)  {
				setDescriptionError(true)
			}
			if (!duration)  {
				setDurationError(true)
			}
		}		
	}

	const submitTask = () => {
		if(descriptionError || durationError) {
			setDescriptionError(false)
			setDurationError(false)
		}
		const newTask = {
			id: v4(),
			description,
			duration,
			countdown: duration,
			time: 0
		};
		console.log(newTask)
		addTask(newTask)
		setDescription('')
		setDuration('')
	}

	useEffect(() => {
		console.log(duration)
		if (duration === 'other') {
			setCustDuration(true)
			setDuration(15)
		}
	}, [duration])


	return (
		<Paper square className={classes.root}>
			<Grid container spacing={3}>
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
							<FormHelperText id={"error-en-nueva-tarea-descripcion"}>{"Descripción de tarea requerida"}</FormHelperText>
						) : null}
					</FormControl>
				</Grid>
				<Grid item md={4}>
				<FormControl error={durationError} className={inputClasses.root}>
				{custDuration 
					?
					<TextField
						label={"Duración (minutos)"}
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
						label={"Duración"}
						id={"nueva-tarea-duracion"}
						name="duration"
						select
						selectOptions={Duraciones}
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
							<FormHelperText id={"error-en-nueva-tarea-duracion"}>{"Duración de tarea requerida"}</FormHelperText>
						) : null}
				</FormControl>
				
				</Grid>
				<Grid item md={2}>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={handleSubmit}
					>
						Agregar
					</Button>
				</Grid>
				
			</Grid>
		</Paper>
	);
}

export default Toolbar;
