import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DoneIcon from "@material-ui/icons/Done";
import RestoreIcon from "@material-ui/icons/Restore";
import TimerIcon from "@material-ui/icons/Timer";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PauseIcon from "@material-ui/icons/Pause";
import SaveIcon from '@material-ui/icons/Save';
import Timer from "./utils/Timer";
import EditItem from "./utils/EditItem";
import { TaskTrackerContext } from "../../../store/TaskTrackerStore";

const useStyles = makeStyles((theme) => ({
	root: {
		alignItems: "center",
	},
	col: {
		display: "flex",
		alignItems: "center",
	},
	timer: {
		color: "rgba(0, 0, 0, 0.54)",
		padding: "0px 5px",
	},
	countdown: {
		textAlign: "center",
		marginLeft: "-8%",
		[theme.breakpoints.up("md")]: {
			marginLeft: "-9%",
		},
	},
	completedTime: {
		color: "#d32f2f",
	},
	buttons: {
		display: "flex",
		justifyContent: "center",
		marginTop: "-10px",
	},
}));

export default function TaskListItem({ listKey, task, index }) {
	const classes = useStyles();

	const {
		showCompleted,
		taskInProgress,
		deleteTask,
		startTask,
		pauseTask,
		resetTask,
		finalizeTask,
		editTask,
		taskCompleted,
	} = useContext(TaskTrackerContext);

	// editItems controls whether or not this item is currently being edited
	const [editItem, setEdit] = useState(false);
	// input values to use in EditItem
	const [inputDescription, setInputDescription] = useState('')
	const [inputDuration, setInputDuration] = useState('')

	// saves the changes in EditItem and removes the edit view
	const onSaveClick = () => {
		editTask(listKey, index, {description:inputDescription, duration:inputDuration})
		setEdit(false)
	}

	/* sets the input values to the current item value and shows the EditItem view 
	so we can edit these values */ 
	const onEditClick = () => {
		setInputDescription(task.description)
		setInputDuration(task.duration)
		setEdit(true)
	}


	// formats obj mins and secs for view
	const showTime = (obj) => {
		return `${obj.mins > 9 ? obj.mins : `0${obj.mins}`}m ${
			obj.secs > 9 ? obj.secs : `0${obj.secs}`
		}s`;
	};

	const showDateCompleted = (date) => {
		const month = date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1
		return `${date.getDate()}/${month}/${date.getFullYear()}`
	}

	return (
		<Grid container className={classes.root}>
			
			<Grid
				item
				xs={8}
				sm={showCompleted ? 8 : 6}
				xl={8}
				className={classes.col}
			>
				{/* col showing task info (description and duration)
			if editItem is true, we show the editItem form in this item
			if it is false, we show the task info (this is the default)*/}

				{editItem ? 
						<EditItem
							inputDescription={inputDescription}
							setInputDescription={setInputDescription}
							inputDuration={inputDuration}
							setInputDuration={setInputDuration}
						/>
						:
						<ListItemText
							primary={task.description}
							secondary={`Duración: ${task.duration} min`}
						/>
				}
			</Grid>

			<Grid
				item
				xs={4}
				sm={showCompleted ? 4 : 2}
				xl={1}
				className={classes.col}
			>
				{/* col showing task time info (countdown OR time it took to complete task)
			if the list this TaskItem is in is "completed", we show the time it took to complete the task
			if it is not, we show the countdown/timer for this item*/}
				{listKey === "completed" ? (
					<>
						<AccessTimeIcon className={classes.timer} />
						<ListItemText
							className={
								index === 0 && taskCompleted ? classes.completedTime : null
							}
							primary={showTime(task.time)}
							secondary={showDateCompleted(task.completed)}
						/>
					</>
				) : (
					<>
						<TimerIcon className={classes.timer} />
						{/* if taskInProgress is true and this item is index 0 in 'todos',
						we show the timer on this item, 
						passing it the function to finalize this task once timer hits 0

						else, we simply show the countdown time for this item */}
						{taskInProgress && index === 0 ? (
							<ListItemText
								primary={
									<div className={classes.countdown}>
										<Timer
											onComplete={() => finalizeTask(index)}
										/>
									</div>
								}
							/>
						) : (
							<ListItemText
								primary={
									<div className={classes.countdown}>
										{`-${showTime(task.countdown)}`}
									</div>
								}
							/>
						)}

					</>
				)}
			</Grid>

			{/* this Grid contains the buttons to manage each item, if we are in the 'completed' 
			list, we do not want to edit the task in any way */}
			{listKey === "completed" ? null : (
				<Grid
					item
					xs={12}
					sm={showCompleted ? 12 : 4}
					xl={3}
					className={classes.buttons}
				>
					{/* if this item is being edited, we show a save button to save the edit,
					else we show the edit option */}
					{editItem ? (
						<IconButton
							onClick={onSaveClick}
							edge="end"
							aria-label="guardar"
						>
							<SaveIcon />
						</IconButton>
					) : (
						<IconButton
							onClick={onEditClick}
							edge="end"
							aria-label="editar"
						>
							<EditIcon />
						</IconButton>
					)}

					{/* if this item is in progress, we show the pause button to pause this task
					else we show the play button to start this task */}
					{taskInProgress && index === 0 ? (
						<IconButton 
							onClick={pauseTask} 
							edge="end" 
							aria-label="pausar"
						>
							<PauseIcon />
						</IconButton>
					) : (
						<IconButton
							onClick={() => startTask(index)}
							edge="end"
							aria-label="iniciar"
						>
							<PlayArrowIcon />
						</IconButton>
					)}

					<IconButton
						onClick={() => resetTask(index)}
						edge="end"
						aria-label="reiniciar"
					>
						<RestoreIcon />
					</IconButton>
					<IconButton
						onClick={() => finalizeTask(index)}
						edge="end"
						aria-label="completar"
					>
						<DoneIcon />
					</IconButton>
					<IconButton
						onClick={() => deleteTask(index)}
						edge="end"
						aria-label="borrar"
					>
						<DeleteIcon />
					</IconButton>
				</Grid>
			)}
		</Grid>
	);
}
