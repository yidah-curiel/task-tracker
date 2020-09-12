import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
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

export default function ComposedTextField({
	label,
	helper,
    id,
    select,
	name,
	value,
	onChange,
    error,
	selectOptions,
	required,
	type
}) {
	const classes = useStyles();

	return (
		<FormControl error={error} className={classes.root}>
			<TextField
				id={id}
				label={label}
				select={select}
				name={name}
				value={value}
				type={type}
				required={required}
				onChange={onChange}
				InputLabelProps={{
					shrink: true,
				}}
			>
                {select && selectOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                         {option.label}
                    </MenuItem>
                ))}
            </TextField>
			{error ? (
				<FormHelperText id={`error-en-${id}`}>{helper}</FormHelperText>
			) : null}
		</FormControl>
	);
}
