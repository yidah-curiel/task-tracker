import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { v4 } from "uuid";
import TextField from "./utils/ui/TextField";
//import SaveIcon from '@material-ui/icons/Save';
import useForm from './utils/hooks/useForm';


const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		padding: theme.spacing(1),
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	container: {
		alignItems: "center",
	},
	button: {
	//	width: "100%",
	},
}));

const Duraciones = [
	{ value: 30, label: "Corta (30 min)" },
	{ value: 45, label: "Media (45 min)" },
	{ value: 60, label: "Larga (1 hr)" },
];

function Toolbar({ setTasks }) {
	const classes = useStyles();

	const addTask = (inputs) => {
		const newTask = {
			id: v4(),
			...inputs
		};
		setTasks((prev) => {
			const prevTasks = { ...prev };
			prevTasks["todos"].items.unshift(newTask);
			return prevTasks;
		});
	};

	const { inputs,handleInputChange,handleSubmit } = useForm(addTask);

	return (
		<Paper square className={classes.root}>
			<Grid container spacing={3} className={classes.container}>
				<Grid item md={6}>
					<TextField
						label={"Nueva Tarea"}
						helper={"Descripción de tarea requerida"}
						id={"nueva-tarea-descripcion"}
						name="description"
						value={inputs.description ? inputs.description : ""}
						onChange={handleInputChange}
						error={false}
						required={true}
					/>
				</Grid>
				<Grid item md={4}>
					<TextField
						label={"Duracion"}
						helper={"Duración de tarea requerida"}
						id={"nueva-tarea-duracion"}
						name="duration"
						select
						selectOptions={Duraciones}
						value={inputs.duration ? inputs.duration : ""}
						onChange={handleInputChange}
						error={false}
						required={true}
					/>
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
