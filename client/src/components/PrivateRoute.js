//components/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = ({ children }) => {
    // Get current user from context
    const { user } = useAuthContext(); 

    // Render children if user is authenticated, otherwise navigate to login
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
