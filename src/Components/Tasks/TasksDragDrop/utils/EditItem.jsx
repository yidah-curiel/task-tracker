import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";


const inputStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
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
