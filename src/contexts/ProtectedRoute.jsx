// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/authContext";

export default function ProtectedRoute({ children }){
    const { user, token } = useAuth();

    if (!user || !token) {
        // Redirect to login if user is not logged in
        return <Navigate to="/login" />;
    }

    return children;
};
