import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthProps } from '../../../interfaces/auth-layout.interface';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { useAuth } from "../../../services/authService"
import { Link, useHistory } from 'react-router-dom';
import { UserInterface } from '../../../interfaces/authentication.interface';

const validationSchema: SchemaOf<UserInterface> = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    retypePassword: yup.string().when("password", {
        is: (val: string | any[]) => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
        )
    })
});

export default function SignUp({ classes }: AuthProps) {
    const auth = useAuth();
    const history = useHistory();
    const { from }: any = { from: { pathname: "/auth/login" } };
    const [values] = React.useState<UserInterface>({
        email: '',
        password: '',
        retypePassword: '',
    });

    const handleSubmit = async (values: UserInterface): Promise<void> => {
        auth.signup(values, () => history.replace(from))
    }

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: handleSubmit
    });

    return (
        <form className={classes.root} onSubmit={formik.handleSubmit} autoComplete="on">
            <Typography variant="h2" style={{ textAlign: "center", margin: "1em  0 1em" }}>Sign Up</Typography>
            <TextField
                fullWidth
                variant="outlined"
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                fullWidth
                variant="outlined"
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
                fullWidth
                variant="outlined"
                id="retypePassword"
                name="retypePassword"
                label="Re-type Password"
                type="password"
                value={formik.values.retypePassword}
                onChange={formik.handleChange}
                error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
                helperText={formik.touched.retypePassword && formik.errors.retypePassword}
            />
            <Button className={'submit-button'} variant="contained" color="primary" disableElevation type="submit"><b>Sign-up</b></Button>
            <Typography > Already have an account? <Link style={{ fontWeight: 600 }} to="/auth/login" >Log In</Link>&nbsp;here</Typography>
        </form>
    );
}