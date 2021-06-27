import { useAuth } from './authService';
import { UniversityInterface } from '../interfaces/university.interface';
import { useCallback } from 'react';
import { updateUserFavorites, getUserFavorites } from '../firebase'
import { useSnackbars } from '../components/customSnackbar/CustomizedSnackbar';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';

export default function useProvideUniversity() {
    const UniversityUrl = process.env.REACT_APP_API_UNIV
    const auth = useAuth();
    const token = auth.getToken();
    const { setSnackbarState } = useSnackbars()

    const getUniversities = useCallback(async (source: CancelTokenSource, query?: string): Promise<UniversityInterface[]> => {

        try {
            const response: AxiosResponse<UniversityInterface[]> = await axios.get(`${UniversityUrl}/search?country=${query}`, { cancelToken: source && source.token })
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
            throw new Error(response.status.toString());
        } catch (error) {
            throw error
        }
    }, [UniversityUrl])


    const toggleFavorites = async (payload: UniversityInterface) => {
        const parsedToken = JSON.parse(token)
        const { isFavorite } = payload
        try {
            await updateUserFavorites(parsedToken.uid, payload)
            const successMessage = !isFavorite ? "Removed from favorites" : "Added to favorites"
            setSnackbarState({ status: true, message: successMessage, severity: "success" })
        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }
    }

    const getFromFavorites = useCallback(async (): Promise<UniversityInterface[] | undefined> => {
        const parsedToken = JSON.parse(token)
        try {
            const response: UniversityInterface[] = await getUserFavorites(parsedToken.uid)
            return response as UniversityInterface[]
        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }
    }, [token, setSnackbarState])

    return {
        getUniversities,
        toggleFavorites,
        getFromFavorites
    };
}
