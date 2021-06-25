// import { useSnackbars } from "../components/CustomizedSnackbar"
import { useAuth } from './authService';
import { CancelTokenSource } from 'axios';
import { UniversityInterface } from '../interfaces/university.interface';
import { CountryInterface } from '../interfaces/country.interface';
import useAPIService from './apiService';
import { useCallback } from 'react';
import { ResponseInterface } from '../interfaces/response.interface'


export default function useProvideUniversity() {
    // const { setSnackbarState } = useSnackbars()
    const UniversityUrl = process.env.REACT_APP_API_UNIV
    const Countryurl = process.env.REACT_APP_API_COUNTRY
    let auth = useAuth();
    const token = auth.getToken();
    const { get } = useAPIService(token)


    const getUniversities = useCallback(async (source: CancelTokenSource, query?: string): Promise<UniversityInterface[]> => {
        try {
            const response: UniversityInterface[] = await get(`/search?country=${query}`, UniversityUrl, source)
            return response
        } catch (error) {
            throw error
        }
    }, [UniversityUrl])

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
        getCountries
    };
}
