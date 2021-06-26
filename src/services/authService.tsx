import { useContext, createContext, useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { authFirebase } from '../firebase';
import { UserInterface } from '../interfaces/authentication.interface';

const authContext = createContext<any>([[], () => null]);;


function useProvideAuth() {
    const [token, setToken] = useState<string>(localStorage.getItem('__token') || '');

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

    const signin = async (payload: UserInterface) => {
        const { email, password } = payload
        return authFirebase.signInWithEmailAndPassword(email, password)
    }

    const signup = async (payload: UserInterface) => {
        const { email, password } = payload
        return authFirebase.createUserWithEmailAndPassword(email, password)
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
