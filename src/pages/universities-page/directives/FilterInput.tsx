import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import { useDrawer } from "../../../components/drawer/Drawer"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            flex: 1,
            backgroundColor: '#F6F6F6',
            borderRadius: 5,
            padding: theme.spacing(1, 4)
        },
        iconButton: {
            padding: 6,
            borderRadius: 5,
            color: "#ffff",
            backgroundColor: theme.palette.primary.main,
            marginLeft: theme.spacing(2),
            '&:hover': {
                backgroundColor: theme.palette.primary.main
            }
        },
    }),
);

export default function FilterUniversitysInput({ query, handleSetQuery }: { query: string, handleSetQuery: (props: string) => void }) {
    const classes = useStyles();
    const { toggleDrawer } = useDrawer()

    return (
        <Paper component="form" elevation={0} className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Search by country"
                id="filled-basic"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={query}
                onChange={(e) => handleSetQuery(e.target.value)}
            />
            <IconButton color="primary" className={classes.iconButton} onClick={toggleDrawer(true)}>
                <TuneIcon />
            </IconButton>
        </Paper>
    );
}