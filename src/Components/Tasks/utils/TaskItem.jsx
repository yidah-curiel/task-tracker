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
import AccessTimeIcon from '@material-ui/icons/AccessTime';
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
  countdown: {
    textAlign: 'center',
    marginLeft: '-8%',
    [theme.breakpoints.up('md')]: { 
      marginLeft: '-9%',
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  topMargin: {
      marginTop: '-10px'
  }
}));

export default function TaskListItem({showCompleted, listKey, task}) {
  const classes = useStyles();

  return (
        <Grid container className={classes.root}>
          <Grid item xs={8} sm={showCompleted ? 8 : 6} xl={8} className={classes.col}>
            <ListItemText
              primary={task.description}
              secondary={`Duración: ${task.duration} min`}
            />
          </Grid>
          <Grid item xs={4} sm={showCompleted ? 4 : 2} xl={1} className={classes.col}>
            { listKey === "completed" ?
              <>
                <AccessTimeIcon className={classes.timer} />
                <ListItemText primary="20 min" />
              </>
              :
              <>
                <TimerIcon className={classes.timer} />
                <ListItemText 
                  primary= {
                    <div className={classes.countdown}>
                      - 30m 00s
                    </div>
                  }
                />
              </>
            }
          </Grid>
        { listKey === "completed" ?
          null :
          <Grid item xs={12} sm={showCompleted ? 12 : 4} xl={3} className={clsx(classes.buttons, classes.topMargin)}>
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
        }
        </Grid>
  );
}
