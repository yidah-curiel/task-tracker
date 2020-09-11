import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DoneIcon from "@material-ui/icons/Done";
import RestoreIcon from "@material-ui/icons/Restore";
import TimerIcon from "@material-ui/icons/Timer";
import clsx from 'clsx';

//import PauseIcon from "@material-ui/icons/Pause";

const useStyles = makeStyles((theme) => ({
  listItem: {
    backgroundColor: "#a5d6a7",
    marginBottom: 5,
    borderRadius: 7
  },
  root: {
    alignItems: "center"
  },
  col: {
    display: "flex",
    alignItems: "center"
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  timer: {
    color: "rgba(0, 0, 0, 0.54)",
    padding: "0px 5px"
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  topMargin: {
      marginTop: '-10px'
  }
}));

export default function TaskListItem({showCompleted}) {
  const classes = useStyles();

  return (
        <Grid container className={classes.root}>
          <Grid item xs={8} sm={showCompleted ? 8 : 6} xl={8} className={classes.col}>
            <ListItemText
              primary="Descripcion de tarea"
              secondary={showCompleted ? "30 min" : "Duración: 30 min"}
            />
          </Grid>
          <Grid item xs={4} sm={showCompleted ? 4 : 2} xl={1} className={classes.col}>
            <TimerIcon className={classes.timer} />
            <ListItemText primary="20 min" />
          </Grid>
          <Grid item xs={12} sm={showCompleted ? 12 : 4} xl={3} className={showCompleted ? clsx(classes.buttons, classes.topMargin) : classes.buttons}>
            <IconButton edge="end" aria-label="editar">
                <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="iniciar">
              <PlayArrowIcon />
            </IconButton>

                <IconButton edge="end" aria-label="reiniciar">
                <RestoreIcon />
                </IconButton>
                <IconButton edge="end" aria-label="completar">
                    <DoneIcon />
                </IconButton>
            <IconButton edge="end" aria-label="borrar">
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
  );
}
