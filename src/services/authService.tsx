import { useContext, createContext, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { authFirebase, createUserDocument } from '../firebase';
import { UserInterface } from '../interfaces/authentication.interface';
import { UserCredential } from '@firebase/auth-types';
import { useSnackbars } from './../components/CustomizedSnackbar';

const authContext = createContext<any>([[], () => null]);;

function useProvideAuth() {
    const [token, setToken] = useState<string>(localStorage.getItem('__token') || '');
    const { setSnackbarState } = useSnackbars()

    useEffect(() => {
        const unsubscribe = authFirebase.onAuthStateChanged(user => {
            if (user) {
                setUserToken(JSON.stringify(user))
            }
        })
        return unsubscribe
    }, [])

    const setUserToken = (userToken: string) => {
        localStorage.setItem('__token', userToken ? (userToken) : '');
        setToken(userToken)
        if (!userToken) {
            setToken('')
        }
    }

    const getToken = () => {
        return token
    }

    const signin = async (payload: UserInterface, cb: () => void) => {
        const { email, password } = payload
        try {
            const { user }: UserCredential = await authFirebase.signInWithEmailAndPassword(email, password)
            if (user) {
                cb()
            } else {
                throw new Error('Unknown error occured');
            }
        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }
    }

    const signup = async (payload: UserInterface, cb: () => void) => {
        const { email, password } = payload
        try {
            const { user }: UserCredential = await authFirebase.createUserWithEmailAndPassword(email, password)
            if (user) {
                createUserDocument(user)
                setSnackbarState({ status: true, message: "Registration success", severity: "success" })
                cb()
            } else {
                throw new Error('Unknown error occured');
            }
        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }
    }


    const signout = () => {
        localStorage.removeItem("__token")
        setToken('')
        return authFirebase.signOut()
    };

    return {
        signin,
        signup,
        signout,
        setToken,
        getToken,
    };
}

export function ProvideAuth({ children }: any) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

export function PrivateRoute({ children, ...rest }: any) {
    const auth = useAuth();
    const token = auth.getToken();

    return (
        <Route {...rest} render={({ location }) => {
            return (
                token ? (
                    location.pathname === '/' ? <Redirect to={{ pathname: "/home", state: { from: location } }} /> : children
                ) : (
                    <Redirect to={{ pathname: "/auth/login", state: { from: location } }} />
                )
            )
        }
        }
        />
    );
}

export function PublicRoute({ children, ...rest }: any) {
    let auth = useAuth();
    const token = auth.getToken();

    return (
        <Route {...rest} render={({ location }) =>
            !token ? (
                location.pathname === '/auth' ? <Redirect to={{ pathname: "/auth/login", state: { from: location } }} /> : children
            ) : (
                <Redirect to={{ pathname: "/home", state: { from: location } }} />
            )
        }
        />
    );
}
