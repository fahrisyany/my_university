import React, { MouseEventHandler } from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface ForgotPasswordDrawerProps {
    classes: any;
    toggleDrawer: (props: boolean) => MouseEventHandler<HTMLDivElement> | undefined
}

const forgotPasswordDrawer = ({ classes, toggleDrawer }: ForgotPasswordDrawerProps) => (
    <div
        className={classes.content}
        role="presentation"
        onClick={toggleDrawer(false)}
    >
        <div className='forget-password-info layout-column align-center '>
            <Typography style={{ fontWeight: 600, textAlign: "center" }}>Forgot Password?</Typography>
            <Typography>We’ve sent you an email with a link to reset your password.</Typography>
            <Button className={"btn-cta"} variant="contained" color="primary" disableElevation><b>Okay</b></Button>
        </div>
    </div>
);

export default forgotPasswordDrawer