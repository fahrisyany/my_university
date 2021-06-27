import React, { useContext, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useLocation } from 'react-router-dom';
import filterUniversityDrawer from './directives/filterUniversityDrawer'
import forgotPasswordDrawer from './directives/forgetPasswordDrawer'

const useStyles = makeStyles((theme: Theme) => ({
    drawerPaper: {
        borderRadius: '24px 24px 0px 0px',
        padding: theme.spacing(4),
        textAlign: 'center',
        maxWidth: 480,
        margin: "auto",
    },
    drawerPaperFilter: {
        height: '60%',
    },
    drawerPaperResetPassword: {
        height: '50%',
    },
    drawerIcon: {
        background: '#F2F2F2',
        borderRadius: 4,
        width: 64,
        height: 6.48,
        left: 0,
        right: 0,
        margin: '0 auto'
    },
    content: {
        position: 'relative',
        height: '100%',
        padding: theme.spacing(2, 2, 0),
        '& > *': {
            margin: theme.spacing(3, 0),
            width: '100%',
        },
        '& .forget-password-info ': {
            height: '100%',
            marginTop: theme.spacing(-8)
        },
        '& .btn-cta': {
            padding: theme.spacing(4),
            width: "100%",
            color: "#ffff",
            position: 'absolute',
            bottom: 0,
            left: 0,
        },
    }
}));

interface DrawerContextInterface {
    drawer: boolean,
    toggleDrawer: (props: boolean | any) => any
}

interface FilterState {
    country: string,
    state: string,
    ranking: string,
    tuition: string
}

const drawerContext = React.createContext<DrawerContextInterface>(
    { drawer: false, toggleDrawer: () => { } }
);

function useProvideDrawer() {
    const [drawer, setDrawer] = useState<boolean>(false);

    const toggleDrawer = (open: boolean) => (): void => { setDrawer(open); };

    return { drawer, toggleDrawer };
}

export function ProvideDrawer({ children }: any) {
    const drawerSvc = useProvideDrawer()
    return (
        <drawerContext.Provider value={drawerSvc}>
            {children}
        </drawerContext.Provider>
    );
}

export function useDrawer() {
    return useContext(drawerContext);
}

export function Drawer() {
    const classes = useStyles();
    const location = useLocation();
    const { drawer, toggleDrawer } = useDrawer()
    const [values, setValues] = React.useState<FilterState>({
        country: "",
        state: "",
        ranking: "",
        tuition: "",
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof values;
        setValues({ ...values, [name]: event.target.value });
    };


    const renderDrawerContent = () => {
        switch (location.pathname) {
            case "/universities":
                return filterUniversityDrawer({ classes, values, toggleDrawer, handleChange })
            case "/auth/login":
                return forgotPasswordDrawer({ classes, toggleDrawer })
            default:
                break;
        }
    }

    const renderHeight = () => {
        switch (location.pathname) {
            case "/universities":
                return classes.drawerPaperFilter
            case "/auth/login":
                return classes.drawerPaperResetPassword
            default:
                break;
        }
    }

    return (
        <SwipeableDrawer
            classes={{ paper: `${classes.drawerPaper} ${renderHeight()}` }}
            anchor={"bottom"}
            open={drawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(false)}
        >
            <div className={classes.drawerIcon}></div>
            {renderDrawerContent()}
        </SwipeableDrawer>
    );
}
