import React from 'react';
import { useProvideAuth } from '../hooks/useAuth';

export const authContext = React.createContext();

export function ProvideAuth({children}) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}
    </authContext.Provider>
}
    