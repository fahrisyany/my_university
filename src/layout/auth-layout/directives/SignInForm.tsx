import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthProps } from '../../../interfaces/auth-layout.interface'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useDrawer } from "../../../components/drawer/Drawer"
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../../../services/authService"

interface State {
    email: string
    password: string;
    showPassword: boolean;
    anchor: boolean
}

export default function SignInForm({ classes }: AuthProps) {
    const [values, setValues] = React.useState<State>({
        email: "fahrisyany@gmail.com",
        password: "123123123",
        showPassword: false,
        anchor: false
    });

    const { toggleDrawer } = useDrawer()
    const history = useHistory();
    const auth = useAuth();
    const { from }: any = { from: { pathname: "/home" } };

    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

    const handleClickShowPassword = (): void => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        auth.signin({ email: values.email, password: values.password }, () => history.replace(from))
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl variant="outlined">
                <InputLabel htmlFor="component-outlined">Email</InputLabel>
                <OutlinedInput id="component-outlined" value={values.email} onChange={handleChange("email")} label="email" />
            </FormControl>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            <div className="after-form layout-row content-between">
                <Typography><Checkbox defaultChecked color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} />Remember Me</Typography>
                <Typography onClick={toggleDrawer(true)}> <Link to="/" onClick={preventDefault}>Forgot Password</Link> </Typography>
            </div>

            <Typography className={"version-text"}>Version 1.0</Typography>
            <Button className={'submit-button'} variant="contained" color="primary" disableElevation onClick={handleLogin}><b>Log-in</b></Button>
            <Typography> Don’t have any account? <Link style={{ fontWeight: 600 }} to="/auth/signup">Sign Up</Link>&nbsp;now</Typography>
        </form>
    );
}