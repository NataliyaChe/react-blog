import React, { useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from './AuthContext';

export const ProtectedRoute = ({redirectPath='/login', children}) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={redirectPath} replace />
    }
    return children ? children : <Outlet />;
}
 