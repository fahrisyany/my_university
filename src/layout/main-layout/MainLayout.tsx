import React from 'react';
import { routeService } from "../../services/routeService"
import { Switch, Route } from "react-router-dom";
import BottomNav from "../../components/bottomNav/BottomNav"
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        main: {
            flex: 1,
        },
    }));

export default function MainLayout() {
    const { privateRouting } = routeService()
    const classes = useStyles();

    return (
        <div className={`${classes.main} layout`}>
            <Switch>
                {privateRouting.map((route) => <Route exact key={route.path} path={route.path} render={() => route.component && <route.component />} />)}
            </Switch>
            <BottomNav />
        </div>
    );
};
