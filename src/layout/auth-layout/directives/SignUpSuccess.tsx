import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthProps } from '../../../interfaces/auth-layout.interface';


export default function SignUpSuccess({ classes }: AuthProps) {

    return (
        <div className={classes.root}>
            <Typography style={{ fontWeight: 600, textAlign: "center" }}>Confirm your account with email</Typography>
            <Button className={'submit-button'} variant="contained" color="primary" disableElevation><b>Sign-up</b></Button>
        </div>
    );
}