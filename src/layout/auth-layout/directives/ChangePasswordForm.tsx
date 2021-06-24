import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AuthProps } from '../../../interfaces/auth-layout.interface';

export default function ChangePasswordForm({ classes }: AuthProps) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setChecked(event.target.checked);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="New Password" variant="outlined" />
            <TextField id="outlined-basic" label="Old Password" variant="outlined" />
            <Button className={'submit-button'} variant="contained" color="primary" disableElevation><b>Save New Password</b></Button>
        </form>
    );
}