import { useState, useContext, useEffect } from 'react';
import {authContext} from '../context/AuthContext';
import {useApi} from '../hooks/useApi';

export const useAuth = () => {
    return useContext(authContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const { patch } = useApi();

    if (!user && localStorage.getItem('authorizedUser')) {
        setUser(JSON.parse(localStorage.getItem('authorizedUser')));
    } 

    function updateUser(updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('authorizedUser', JSON.stringify(updatedUser));
        patch('users', user.id, {securityBreaches: updatedUser.securityBreaches, banEndDate: updatedUser.banEndDate});
    }
    
    console.log('user auth', user);
    function login(user) {
        localStorage.setItem('authorizedUser', JSON.stringify(user));
        setUser(user);
    }

    function logout() {
        localStorage.removeItem('authorizedUser');
        setUser(null);
    }

    return {
        user, setUser, updateUser, login, logout
    }
}