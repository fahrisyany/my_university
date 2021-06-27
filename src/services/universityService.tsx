import { useAuth } from './authService';
import { CancelTokenSource } from 'axios';
import { UniversityInterface } from '../interfaces/university.interface';
import { CountryInterface } from '../interfaces/country.interface';
import useAPIService from './apiService';
import { useCallback } from 'react';
import { ResponseInterface } from '../interfaces/response.interface'
import { updateUserFavorites, getUserFavorites } from '../firebase'
import { useSnackbars } from './../components/CustomizedSnackbar';

export default function useProvideUniversity() {
    const UniversityUrl = process.env.REACT_APP_API_UNIV
    const Countryurl = process.env.REACT_APP_API_COUNTRY
    let auth = useAuth();
    const token = auth.getToken();
    const { get } = useAPIService(token)
    const { setSnackbarState } = useSnackbars()

    const getUniversities = useCallback(async (source: CancelTokenSource, query?: string): Promise<UniversityInterface[]> => {

        try {
            const response: UniversityInterface[] = await get(`/search?country=${query}`, UniversityUrl, source)
            return response
        } catch (error) {
            throw error
        }
    }, [UniversityUrl])


    const toggleFavorites = async (payload: UniversityInterface, isFavorite: boolean) => {
        const parsedToken = JSON.parse(token)
        try {
            await updateUserFavorites(parsedToken.uid, payload, isFavorite)
            const successMessage = !isFavorite ? "Removed from favorites" : "Added to favorites"
            setSnackbarState({ status: true, message: successMessage, severity: "success" })

        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }

    }

    const getFromFavorites = async () => {
        const parsedToken = JSON.parse(token)
        try {
            let response: Promise<UniversityInterface[]> = await getUserFavorites(parsedToken.uid)
            return response
        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }

    }

    const getCountries = useCallback(async (source: CancelTokenSource): Promise<CountryInterface[]> => {
        try {
            const response: ResponseInterface<CountryInterface[]> = await get(`countries`, Countryurl, source)
            const { result } = response
            return result
        } catch (error) {
            throw error
        }
    }, [Countryurl])


    return {
        getUniversities,
        getCountries,
        toggleFavorites,
        getFromFavorites
    };
}
