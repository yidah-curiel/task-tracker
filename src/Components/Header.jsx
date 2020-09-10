import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		padding: '1vh 2vh',
		alignItems: "center",
		backgroundColor: "#daa520",
		[theme.breakpoints.up('md')]: {
			height: '5vh'
		}
	},
}));

function Header({ setTasks }) {
	const classes = useStyles();

	return (
		<Paper 
			square
			elevation={3}
			className={classes.root}
			>
				Task Tracker
		</Paper>
	);
}

export default Header;
