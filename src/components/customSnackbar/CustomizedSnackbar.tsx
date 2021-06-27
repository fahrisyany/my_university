import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            width: '420px'
        },
    },
}));

interface State {
    status: boolean;
    message: string;
    severity: SeverityType
}

type SeverityType = "error" | "warning" | "success" | "info"

interface SnackbarContextInterface {
    snackbarState: State,
    setSnackbarState: (props: State) => any,
    handleClose: () => any,
}

const snackbarsContext = React.createContext<SnackbarContextInterface>(
    {
        snackbarState: {
            status: false,
            message: "",
            severity: "success"
        },
        handleClose: () => { },
        setSnackbarState: () => { }
    }
);

export function useProvideSnackbars() {
    const [snackbarState, setSnackbarState] = React.useState<State>({
        status: false,
        message: "",
        severity: "success"
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarState({ ...snackbarState, status: false });
    };

    return { snackbarState, setSnackbarState, handleClose };
}
export function ProvideSnackbar({ children }: any) {
    const snackbarSvc = useProvideSnackbars()
    return (
        <snackbarsContext.Provider value={snackbarSvc}>
            {children}
        </snackbarsContext.Provider>
    );
}

export function useSnackbars() {
    return useContext(snackbarsContext);
}

export function CustomizedSnackbars() {
    const classes = useStyles();
    const { snackbarState, handleClose } = useSnackbars()

    return (

        <Snackbar className={classes.root} open={snackbarState.status} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={handleClose} severity={snackbarState.severity}>
                {snackbarState.message}
            </Alert>
        </Snackbar>
    );
}
