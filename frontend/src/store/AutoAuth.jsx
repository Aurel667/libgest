import { useEffect } from 'react';
import { getMe } from '../api/auth';
import { useAuth } from './AuthSession';


export const AutoAuth = () => {
    const { isLoggedIn, login } = useAuth();
    useEffect(() => {
        if (!isLoggedIn) {
            getMe().then(data => {
                if (data && data.user) {
                    login(data.user);
                }
            }).catch(() => {});
        }
    }, [isLoggedIn]);

    return null;
};
