import React from 'react';
import ImageIncoming from '../../assets/image/image-upcoming.png';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
            margin: 'auto'
        },
    }));

export default function RegisterSuccessPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={ImageIncoming} alt="incoming-email" />
            <br />
            <br />
            <Typography variant="h6" component="h1">Confirm your accont with email</Typography>
        </div>
    );
}