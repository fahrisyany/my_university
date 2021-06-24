import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > div': {
                backgroundColor: theme.palette.primary.main
            }
        }
    }));


export default function Loader() {
    const classes = useStyles()

    return (
        <div className={`${classes.root} lds-facebook`}><div></div><div></div><div></div></div>
    );
}
