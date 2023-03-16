import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import {useAuth} from '../utils/AuthContext';
import {useAuth} from '../hooks/useAuth';

export const ProtectedRoute = ({redirectPath='/login', children}) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />;
}
 