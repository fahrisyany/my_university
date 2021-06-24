import React, { useContext, useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TanyaiLogo from '../assets/logo/logo.png';
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../services/authService"
import Button from '@material-ui/core/Button';
import { routeService } from "../services/routeService"
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            maxWidth: 480,
            backgroundColor: theme.palette.primary.main,
            padding: theme.spacing(8),
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
        list: {
            color: "white",
            width: '100%',
            textAlign: "center",
        },
        menu: {
            marginBottom: '.75em',
        },
        icon: {
            color: '#fff'
        },
        signout: {
            padding: theme.spacing(4),
            color: "#EB5757",
            backgroundColor: "#ffff"
        },
        label: {
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
        },
        selected: {
            borderRight: 'solid 5px',
            marginRight: -theme.spacing(4),
            '& > *': {
                fontWeight: 600,
            }
        }
    }));

interface SideNavContextInterface {
    drawer: boolean,
    toggleDrawer: (props: boolean) => any
}

const sideNavContext = React.createContext<SideNavContextInterface>(
    { drawer: false, toggleDrawer: () => { } }
);

function useProvideSideNav() {
    const [drawer, setDrawer] = useState<boolean>(false);

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setDrawer(open);
    };

    return { drawer, toggleDrawer };
}

export function ProvideSideNav({ children }: any) {
    const drawerSvc = useProvideSideNav()
    return (
        <sideNavContext.Provider value={drawerSvc}>
            {children}
        </sideNavContext.Provider>
    );
}

export function useSideNav() {
    return useContext(sideNavContext);
}

export function SideNav() {
    const classes = useStyles();
    const { drawer, toggleDrawer } = useSideNav()
    const history = useHistory();
    const location = useLocation();
    const auth = useAuth();
    const { privateRouting } = routeService()

    const handleSignout = () => {
        auth.signout(() => history.push("/auth/login"))
        toggleDrawer(false)
    }

    const isCurrentRoute = (path: string) => {
        return path === location.pathname ? true : false
    }

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {privateRouting.map((menu, index) => (menu.display === true &&
                    <ListItem button key={index} className={classes.menu} component={Link} to={menu.path}>
                        <ListItemIcon classes={{ root: classes.icon }}>{menu.icon}</ListItemIcon>
                        <ListItemText primary={menu.label} classes={{ root: isCurrentRoute(menu.path) ? classes.selected : classes.label }} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment >
                <SwipeableDrawer
                    anchor={"right"}
                    open={drawer}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                    classes={{ paper: classes.root }}
                >
                    {list()}
                    <Button className={classes.signout} variant="contained" disableElevation onClick={(e) => { toggleDrawer(false)(e); handleSignout(); }}><b>Sign out</b></Button>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}