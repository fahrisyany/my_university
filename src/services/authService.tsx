import { useContext, createContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import useAPIService from '../services/apiService'
import { useSnackbars } from "../components/CustomizedSnackbar"
import { APIInterface, ResponseInterface } from '../interfaces/response.interface'

const url = process.env.REACT_APP_API
const authContext = createContext<any>([[], () => null]);;


interface UserInterface {
    email: string;
    password: string;
}

function useProvideAuth() {
    const [token, setToken] = useState<string>(localStorage.getItem('__token') || '');
    const { post } = useAPIService(token)
    const { setSnackbarState } = useSnackbars()

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

    const signin = async (payload: UserInterface, cb: () => void): Promise<void> => {
        try {
            let response: APIInterface<ResponseInterface<any>> = await post(`login`, payload)
            const token = response.responses.token
            setUserToken(token)
            if (token) {
                cb()
            }
        } catch (error) {
            setSnackbarState({ status: true, message: error.toString(), severity: "error" })
            throw error
        }
    }

    const signup = async (payload: UserInterface, cb: () => void) => {
        try {
            let response: APIInterface<ResponseInterface<any>> = await post(`users`, payload)
            if (response) {
                cb()
            }
        } catch (error) {
            setSnackbarState({ status: true, message: error.toString(), severity: "error" })
            throw error
        }
    }

    const signout = (cb: () => void) => {
        localStorage.removeItem("__token")
        setToken('')
        cb();
    };

    return {
        signin,
        signup,
        signout,
        setToken,
        getToken
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
