import { useSnackbars } from "../components/CustomizedSnackbar"
import { useAuth } from './authService';
import { CancelTokenSource } from 'axios';
import { UniversityInterface } from '../interfaces/university.interface';
import useAPIService from './apiService';
import { ResponseInterface, APIInterface } from '../interfaces/response.interface'


export default function useProvideBilling() {
    const { setSnackbarState } = useSnackbars()
    const url = process.env.REACT_APP_API_UNIV
    let auth = useAuth();
    const token = auth.getToken();
    const { get, post, postMedia, put } = useAPIService(token)


    const getUniversities = async (source: CancelTokenSource): Promise<UniversityInterface[]> => {
        try {
            const response: UniversityInterface[] = await get(`/search?country=indonesia`, url, source)
            return response
        } catch (error) {
            throw error
        }
    }

    // const getBillingId = async (id: string, source: CancelTokenSource): Promise<BillingInterface> => {
    //     try {
    //         const response: APIInterface<ResponseInterface<BillingInterface>> = await get(`billings/${id}`, source)
    //         const { responses: { data } } = response
    //         return data
    //     } catch (error) {
    //         throw error
    //     }
    // }


    return {
        getUniversities,
        // getBillingId,
    };
}
