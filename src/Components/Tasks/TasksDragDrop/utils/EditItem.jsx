import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {TaskTrackerContext} from '../../../../store/TaskTrackerStore';
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


function EditItem({inputDescription, setInputDescription, inputDuration, setInputDuration}) {
	const inputClasses = inputStyles()



	return (
			<Grid container>
				<Grid item md={8}>
					<FormControl className={inputClasses.root}>
						<TextField
							label={"Descripción"}
							id={"nueva-tarea-descripcion"}
							name="description"
							value={inputDescription}
							onChange={(e)=>setInputDescription(e.target.value)} //{handleInputChange}
						>
						</TextField>

					</FormControl>
				</Grid>

				<Grid item md={4}>
				<FormControl className={inputClasses.root}>
					<TextField
						label={"Duración"}
						id={"nueva-tarea-duracion"}
						name="duration"
						type="number"
						value={inputDuration}
						onChange={(e)=>setInputDuration(e.target.value)}
						InputProps={{
							inputProps: { 
								max: 120, min: 1 
							}
						}}
					>
					</TextField>
				</FormControl>
				
				</Grid>
				
			</Grid>
	);
}

export default EditItem;
