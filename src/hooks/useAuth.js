import React, { useState, useContext } from 'react';
import {authContext} from '../context/AuthContext';

export const useAuth = () => {
    return useContext(authContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    if (!user && localStorage.getItem('authorizedUser')) {
        setUser(JSON.parse(localStorage.getItem('authorizedUser')));
    } 

    function login(user) {
        localStorage.setItem('authorizedUser', JSON.stringify(user));
        setUser(user);
    }

    // function getUser() {
    //     const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
    //     return authorizedUser
    // }

    function logout() {
        localStorage.removeItem('authorizedUser');
        setUser(null);
    }

    return {
        user, login, logout
    }
}