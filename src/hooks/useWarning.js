import { useContext } from 'react';
import {authContext} from '../context/AuthContext';
import {useAuth} from './useAuth';

export const useWarning = () => {
    const { user } = useAuth();
    const warning = user.securityBreaches;
    console.log('use warning', warning);

    return {
        warning
    }
}