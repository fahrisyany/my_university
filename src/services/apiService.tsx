import axios, { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';
import { useAuth } from './authService'
import { useHistory } from "react-router-dom";
import { useSnackbars } from "../components/CustomizedSnackbar"

export default function useAPIService(token: string) {
    const url = process.env.REACT_APP_API
    const auth = useAuth();
    const history = useHistory();
    const { setSnackbarState } = useSnackbars()

    const service = axios.create({
        headers: {
            'Authorization': token
        }
    });

    const handleSignout = (): void => {
        auth.signout(() => history.push("/auth/login"))
    }

    const handleError = (error: { response?: { status?: any; message: any }; }): void => {
        switch (error?.response?.status) {
            case 401:
                const message = "Oh no... authorization required please"
                handleSignout()
                setSnackbarState({ status: true, message: message, severity: "error" })
                break
            // case 404:
            //     this.redirectTo(document, '/404')
            //     break;
            default:
                // handleSignout()
                break;
        }
    }

    service.interceptors.response.use(
        response => response,
        error => {
            handleError(error)
            return Promise.reject(error)
        }
    )

    async function get<T>(path: string, baseURL?: string, source?: CancelTokenSource): Promise<T> {
        return service.get(`${baseURL ? baseURL : url}${path}`, { cancelToken: source && source.token })
            .then((response: AxiosResponse<T>) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                }
                throw new Error(response.status.toString());
            }).catch((error: AxiosError) => {
                throw error
            })
    }

    async function post<T>(path: string, payload: any, source?: CancelTokenSource): Promise<T> {
        return service.post(`${url}${path}`, payload, { cancelToken: source && source.token })
            .then((response: AxiosResponse<T>) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                }
                throw new Error(response.status.toString());
            }).catch((error: AxiosError) => {
                throw error
            })
    }

    async function put<T>(path: string, payload: any, source?: CancelTokenSource): Promise<T> {
        return service.put(`${url}${path}`, payload, { cancelToken: source && source.token })
            .then((response: AxiosResponse<T>) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                }
                throw new Error(response.status.toString());
            }).catch((error: AxiosError) => {
                throw error
            })
    }

    async function postMedia<T>(path: string, payload: any, source?: CancelTokenSource): Promise<T> {
        let fd = new FormData();
        fd.append('file', payload as string | Blob)
        return service.post(`${url}${path}`, fd, { headers: { 'Content-Type': 'multipart/form-data' }, cancelToken: source && source.token })
            .then((response: AxiosResponse<T>) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                }
                throw new Error(response.status.toString());
            }).catch((error: AxiosError) => {
                throw error
            })
    }

    return { get, post, postMedia, put }
}
