import React from "react";
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles({
    bar:{
        width: '100%',
        marginTop:20
    } 
});

export default () =>{
    const classes = useStyles();
    return (
        <div className={classes.bar}>
            <LinearProgress></LinearProgress>
        </div>
    )
}