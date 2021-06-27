import { useAuth } from './authService';
import { UserInterface } from '../interfaces/user.interface';
import { useCallback } from 'react';
import { getUserProfile } from '../firebase'
import { useSnackbars } from '../components/customSnackbar/CustomizedSnackbar';

export default function useProvideProfile() {
    const auth = useAuth();
    const token = auth.getToken();
    const { setSnackbarState } = useSnackbars()


    const getProfileInfo = useCallback(async (): Promise<UserInterface | undefined> => {
        const parsedToken = JSON.parse(token)
        try {
            const response: UserInterface | null = await getUserProfile(parsedToken.uid)
            return response as UserInterface
        } catch (error) {
            setSnackbarState({ status: true, message: error.message, severity: "error" })
            if (error instanceof TypeError) {
                throw error
            }
        }
    }, [token, setSnackbarState])

    return {
        getProfileInfo
    };
}
