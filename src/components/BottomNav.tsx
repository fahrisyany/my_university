import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { routeService } from "../services/routeService"
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: 0,
            left: "0px",
            right: "0px",
            height: "80px",
            boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;',
            maxWidth: "480px",
            width: "100%",
            margin: 'auto'
        },
        label: {
            marginTop: '.65em',
            fontSize: "0.7rem"
        },
        selected: {
            fontSize: "0.7rem !important"
        },
        button: {
            minWidth: "40px"
        }
    }));

export default function BottomNav() {
    const classes = useStyles();
    const [value, setValue] = React.useState<number | null>(null);
    const { privateRouting } = routeService()
    const location = useLocation();

    useEffect(() => {
        privateRouting.forEach((menu, index) => {
            let isSameBasePath = location.pathname.split('/').includes(menu.path.substring(1))
            if (isSameBasePath) {
                setValue(index)
            }
        })
    }, [location.pathname, privateRouting])

    return (
        <BottomNavigation value={value} onChange={(event, newValue) => { setValue(newValue) }} className={classes.root}>
            {privateRouting.map((menu, index) => (menu.display === true && <BottomNavigationAction key={index} classes={{ root: classes.button, label: classes.label, selected: classes.selected }} component={Link} to={menu.path} label={menu.label} icon={menu.icon} />))}
        </BottomNavigation>
    );
}