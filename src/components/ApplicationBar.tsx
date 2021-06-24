import React, { JSXElementConstructor, ReactElement, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from '../services/authService'
import { useSideNav } from "./SideNav"
import { useLocation } from 'react-router-dom';
import { routeService } from "../services/routeService"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "relative",
        },
        appBar: {
            backgroundColor: "#ffff",
            boxShadow: '0px 8px 8px -4px #18274B14',
            minHeight: 56
        },
        menuButton: {
            marginRight: theme.spacing(2),
            position: 'absolute',
            right: 0,
            color: theme.palette.secondary.main
        },
        title: {
            flexGrow: 1,
            textAlign: "center",
            color: theme.palette.primary.main
        },
    }));


function ApplicationBar() {
    const classes = useStyles();
    const auth = useAuth();
    const token = auth.getToken();
    const location = useLocation();
    const { privateRouting, publicRouting } = routeService()
    const { toggleDrawer } = useSideNav()
    const [value, setValue] = React.useState<string>("");

    const isAuthenticated = (): ReactElement<any, string | JSXElementConstructor<any>> | void => {
        if (token) {
            return (
                <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
            )
        }
    }

    useEffect(() => {
        let currentRoute;
        location.pathname.includes('auth') ? currentRoute = publicRouting : currentRoute = privateRouting
        currentRoute.forEach((menu) => {
            let arr = location.pathname.split('/')
            let newLocationPath = arr.slice(0, 3).join("/");
            if (arr.length >= 4) {
                newLocationPath += '/:id'
            }
            menu.path === newLocationPath && setValue(menu.label)
        })
    }, [location.pathname])

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" component='p' className={classes.title}>
                        {value}
                    </Typography>
                    {isAuthenticated()}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default ApplicationBar;
