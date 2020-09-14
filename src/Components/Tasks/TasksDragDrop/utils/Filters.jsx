import React, {useState, useEffect} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
});

const Duraciones = [
	{ value: 1, label: "Corta (1-30 min)" },
	{ value: 2, label: "Media (31-59 min)" },
	{ value: 3, label: "Larga (1 hr+)" },
];

function Filters({ duracion, handleDuracion }) {
    const classes = useStyles();
    
    return (
        <FormControl variant="filled" className={classes.root}>
        <InputLabel htmlFor="filtrar-duracion">Filtrar Duración</InputLabel>
        <Select
          value={duracion}
          onChange={(e)=>handleDuracion(e.target.value)}
          inputProps={{
            name: 'duracion',
            id: 'filtrar-duracion',
          }}
        >
            <MenuItem value="" />
            {Duraciones.map(option => (
				<MenuItem key={option.value} value={option.value}>
                    {option.label}
				</MenuItem>
			))}    
        </Select>
      </FormControl>
    )

}

export default Filters