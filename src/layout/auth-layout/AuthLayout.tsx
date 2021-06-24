import React from 'react';
import study from '../../assets/image/study-image.svg';
import { routeService } from "../../services/routeService"
import { Switch, Route, useLocation } from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            flex: 1,
            backgroundColor: "#ffff",
            textAlign: 'left',
            padding: theme.spacing(8, 4, 0),

        },
        root: {
            boxSizing: "border-box",
            '& > *': {
                margin: theme.spacing(2, 0),
                width: '100%',
            },
            '& .MuiCheckbox-root': {
                padding: theme.spacing(3, 3, 3, 0),
            },
            '& .version-text': {
                color: "#A3A2A2",
                fontSize: ".85em",
                textAlign: "center"
            },
            '& .after-form': {
                alignItems: 'baseline',
                '& > *': {
                    fontWeight: "600",
                    fontSize: ".90em",
                }
            },
            '& .submit-button': {
                padding: theme.spacing(4),
                color: "#ffff"
            },
        },
        logo: {
            width: "300px",
            margin: theme.spacing(8, 'auto'),
            display: "block",
        },
    }));

interface LocationState {
    pathname: string;
}


export default function AuthPage() {
    let { publicRouting } = routeService()
    const location = useLocation<LocationState>();
    const classes = useStyles();

    const renderLogo = () => {
        if (location.pathname === "/auth/login") {
            return <>
                <img src={study} alt="my-logo" className={classes.logo} />
                <Typography component="h2" style={{ fontSize: '1.8rem' }} >
                    Create, Study and be productive right now
                </Typography>
                <br />
                <Typography variant="subtitle1">
                    Get to know your prefered university and collaborate with other fellow students
                </Typography>
                <br />
            </>
        }
    }

    return (
        <div className={`${classes.main} layout-column`}>
            {renderLogo()}

            <Switch>
                {publicRouting.map((route) => <Route key={route.path} path={route.path} render={() => route.component && <route.component classes={classes} />} />)}
            </Switch>
        </div>
    );
}