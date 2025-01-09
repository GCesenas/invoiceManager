import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children, requiredPermissions = [] }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (
        requiredPermissions.length > 0 &&
        !requiredPermissions.every((permission) =>
            user.permissions.some((userPermission) => userPermission.name === permission)
        )
    ) {
        return <Navigate to="/unauthorized" replace />; 
    }

    return children;
};

export default ProtectedRoute;
