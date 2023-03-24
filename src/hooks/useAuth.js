import { useState, useContext, useEffect } from 'react';
import {authContext} from '../context/AuthContext';
import {useApi} from '../hooks/useApi';

export const useAuth = () => {
    return useContext(authContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const { getUserByEmail } = useApi();

    if (!user && localStorage.getItem('authorizedUser')) {
        setUser(JSON.parse(localStorage.getItem('authorizedUser')));
    } 

    function updateUser(breachesQty, banEnd) {
        //   const fetchUsers = async () => {
        //     const matchUser = await getUserByEmail('users', user.email);
        //     setUser(matchUser[0])
        //   }
        //   fetchUsers();
        setUser({
            login: user.login,
            email: user.email,
            password: user.password,
            id: user.id,
            securityBreaches: breachesQty,
            ban: user.ban,
            banEndDate: banEnd
        });
        console.log('user auth', user);
        localStorage.setItem('authorizedUser', JSON.stringify(user));
    }

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