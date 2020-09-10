import React, {useEffect} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        //justifyContent: 'center'
    },
    label: {
        color: '#27c2c7',
    },
    menu_item: {
        color: '#27c2c7',
    },
    icon: {
        color: '#27c2c7',
    },
    select: {
        color: '#27c2c7',
        '&:before': {
            borderColor: 'white',
        },            
        '&:after': {
            borderColor: '#27c2c7',
        }
    }
});




function CustomSelect({ handleChange, selectOptions, selectName }) {
  //  const SelectLabel = selectName.charAt(0).toUpperCase() + selectName.slice(1)

    const classes = useStyles();

    useEffect(() => {
        console.log(selectOptions)
    })

    return (
        <div className={classes.root}>
            <InputLabel className={classes.label}>{`${selectName}: `}</InputLabel >
            <Select
                className={classes.select}
                onChange={handleChange}
                name={selectName}
                classes={{
                    icon: classes.icon
                }}
            >
                {selectOptions && selectOptions.map((e, i) =>
                        <MenuItem className={classes.menu_item} key={i} value={e.value}>{e.label}</MenuItem>
                    )}


            </Select>
        </div>
    )
}

export default CustomSelect

