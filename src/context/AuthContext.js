import React, { useState, useContext } from 'react';
import {useProvideAuth} from '../hooks/useAuth';

export const authContext = React.createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}
    </authContext.Provider>
}

// export const useAuth = () => {
//     return useContext(authContext);
// }

// function useProvideAuth() {
//     const [user, setUser] = useState(null);
//     if (!user && localStorage.getItem('authorizedUser')) {
//         setUser(JSON.parse(localStorage.getItem('authorizedUser')));
//     } 

//     function login(user) {
//         localStorage.setItem('authorizedUser', JSON.stringify(user));
//         setUser(user);
//     }

//     function getUser() {
//         const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
//         return authorizedUser
//     }
    

//     function logout() {
//         localStorage.removeItem('authorizedUser');
//         setUser(null);
//     }

//     return {
//         user, login, getUser, logout
//     }
// }


    