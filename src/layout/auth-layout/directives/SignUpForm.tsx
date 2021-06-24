import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { AuthProps } from '../../../interfaces/auth-layout.interface';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { useAuth } from "../../../services/authService"
import { Link, useHistory } from 'react-router-dom';
import { useSnackbars } from "../../../components/CustomizedSnackbar"

interface State {
    fullName: string
    email: string;
    whatsappNumber: string;
    password: string;
    retypePassword: string;
    agreeTC: boolean;
}

type Person = {
    email: string;
    password: string
};

const validationSchema: SchemaOf<Person> = yup.object({
    fullName: yup
        .string()
        .required('Full Name is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    whatsappNumber: yup
        .number()
        .required('WA Number is required'),
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
    const { from }: any = { from: { pathname: "/auth/register-success" } };
    const { setSnackbarState } = useSnackbars()
    const [values] = React.useState<State>({
        fullName: 'asd',
        email: 'fahrisyany@gmail.com',
        whatsappNumber: '123123123',
        password: 'Masuk2311',
        retypePassword: 'Masuk2311',
        agreeTC: false,
    });

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (values.agreeTC) {
                auth.signup(values, () => history.replace(from))
            } else {
                setSnackbarState({ status: true, message: "Accept Terms and Condition to proceed.", severity: "warning" })
            }
        },
    });

    return (
        <form className={classes.root} onSubmit={formik.handleSubmit} autoComplete="on">
            <TextField
                fullWidth
                variant="outlined"
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
            />
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
                type="number"
                id="whatsappNumber"
                name="whatsappNumber"
                label="WhatsApp Number"
                value={formik.values.whatsappNumber}
                onChange={formik.handleChange}
                error={formik.touched.whatsappNumber && Boolean(formik.errors.whatsappNumber)}
                helperText={formik.touched.whatsappNumber && formik.errors.whatsappNumber}
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
            <div className="after-form">
                <Typography style={{ fontWeight: 600 }}>
                    <Checkbox checked={formik.values.agreeTC} value={formik.values.agreeTC} onChange={formik.handleChange} id="agreeTC" name="agreeTC" />
                    I Agree to <Link to="/" >terms and conditions</Link></Typography>
            </div>
            <Button className={'submit-button'} variant="contained" color="primary" disableElevation type="submit"><b>Sign-up</b></Button>
            <Typography > Already have an account? <Link style={{ fontWeight: 600 }} to="/auth/login" >Log In</Link>&nbsp;here</Typography>
        </form>
    );
}