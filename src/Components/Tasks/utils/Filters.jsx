import React, {useState} from 'react';
import Select from './Select'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
        display: 'flex'
    },
});

const Duraciones = [
    { value: "", label: "" },
    { value: "corta", label: "Corta" },
    { value: "media", label: "Media" },
    { value: "larga", label: "Larga" }
]

function Filters() {
    const classes = useStyles();

    const [filters, setFilters] = useState({})

    const handleSearchFilter = (e) => {
        const { name, value } = e.target
        let newFilters = { ...filters };
        newFilters[name] = value
        setFilters(newFilters)
        console.log(newFilters)
    }

    return (
        <div className={classes.root}>
                <Select handleChange={handleSearchFilter} selectOptions={Duraciones} selectName={"Duracion"} />
        </div>
    )

}

export default Filters