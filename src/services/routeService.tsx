import React from 'react';
import { AuthProps } from '../interfaces/auth-layout.interface';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SignInForm from '../layout/auth-layout/directives/SignInForm'
import SignUpForm from '../layout/auth-layout/directives/SignUpForm'
import RegisterSuccessPage from '../pages/register-success-page/RegisterSuccessPage'
import SignUpSuccess from '../layout/auth-layout/directives/SignUpSuccess'
import ChangePasswordForm from '../layout/auth-layout/directives/ChangePasswordForm'
import HomePage from '../pages/home-page/HomePage'
import UniversitiesPage from '../pages/universities-page/UniversitiesPage'
import PasswordPage from '../pages/password-page/PasswordPage';
import ProfilePage from '../pages/profile-page/ProfilePage';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';

interface RoutesServiceInterface {
    path: string; display: boolean; component?: (props: any) => React.ReactElement, nested?: RoutesServiceInterface[], icon?: any, label: string
}

export function routeService() {

    const publicRouting: RoutesServiceInterface[] = [
        {
            label: "My University",
            path: `/auth/signup`,
            display: false,
            component: ({ classes }: AuthProps) => <SignUpForm classes={classes} />,
        },
        {
            label: "Register Success",
            path: `/auth/register-success`,
            display: false,
            component: ({ classes }: AuthProps) => <RegisterSuccessPage />,
        },
        {
            label: "My University",
            path: `/auth/login`,
            display: false,
            component: ({ classes }: AuthProps) => <SignInForm classes={classes} />,
        },
        {
            label: "Confirm Email",
            path: `/auth/confirm-email`,
            display: false,
            component: ({ classes }: AuthProps) => <SignUpSuccess classes={classes} />,
        },
        {
            label: "Change Password",
            path: `/auth/change-password`,
            display: false,
            component: ({ classes }: AuthProps) => <ChangePasswordForm classes={classes} />,
        },
    ]

    const privateRouting: RoutesServiceInterface[] = [
        {
            label: "Home",
            path: `/home`,
            display: true,
            icon: <HomeOutlinedIcon />,
            component: () => <HomePage />,
        },
        {
            label: "Universities",
            path: `/universities`,
            display: true,
            icon: <HomeWorkOutlinedIcon />,
            component: () => <UniversitiesPage />,
        },
        {
            label: "Change Password",
            path: `/profile/change-password`,
            display: false,
            component: () => <PasswordPage />,
        },
        {
            label: "Profile",
            path: `/profile`,
            display: true,
            icon: <PersonOutlineIcon />,
            component: () => <ProfilePage />,
        },
    ]

    return {
        privateRouting,
        publicRouting
    }
}