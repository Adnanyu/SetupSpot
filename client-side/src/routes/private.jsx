import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const PrivateRoutes = () => {
    const { currentUser } = useSelector(state => state.user)
    return (
        currentUser ? <Outlet /> : <Navigate to='/login' />
    ); 
};

export default PrivateRoutes;