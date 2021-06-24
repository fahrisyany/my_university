import React from 'react';
import ImageIncoming from '../../assets/image/image-upcoming.png';
import { routeService } from "../../services/routeService"
import { useLocation } from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
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

interface LocationState {
    pathname: string;
}


export default function RegisterSuccessPage() {
    let { publicRouting } = routeService()
    const location = useLocation<LocationState>();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={ImageIncoming} alt="tanyai-image" />
            <br />
            <br />
            <Typography variant="h6" component="h1">Confirm your accont with email</Typography>
        </div>
    );
}