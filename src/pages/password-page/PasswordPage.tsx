import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(8),
            padding: theme.spacing(4),
            flex: 1,
            width: "100%",
            boxSizing: "border-box",
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(2, 0),
                width: '100%',
            },
        },
        savePassword: {
            padding: theme.spacing(4),
            position: 'fixed',
            bottom: '80px',
            left: 0,
            right: 0,
            maxWidth: '480px',
            margin: '0 auto',
            boxSizing: 'border-box',
            '& > *': {
                color: "#ffff",
                width: "100%",
                padding: theme.spacing(4),
            }
        },
    }));

interface State {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export default function PasswordPage() {
    const classes = useStyles()
    const [values, setValues] = React.useState<State>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof values;
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl variant="outlined">
                <TextField label="Current Password" variant="outlined" value={values.currentPassword} inputProps={{ name: 'currentPassword' }} onChange={handleChange} />
            </FormControl>
            <FormControl variant="outlined">
                <TextField label="New Password" variant="outlined" value={values.newPassword} inputProps={{ name: 'newPassword' }} onChange={handleChange} />
            </FormControl>
            <FormControl variant="outlined">
                <TextField label="Confirm New Password" variant="outlined" value={values.confirmNewPassword} inputProps={{ name: 'confirmNewPassword' }} onChange={handleChange} />
            </FormControl>
            <Paper elevation={0} className={classes.savePassword}>
                <Button  variant="contained" color="primary" disableElevation onClick={handleSubmit}><b>Save</b></Button>
            </Paper>
        </form>
    );
}
