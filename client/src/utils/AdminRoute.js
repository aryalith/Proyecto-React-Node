import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AdminRoute = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to="/login" />;
    if (user.user[0].role !== "admin") return <Navigate to="/login" />;
    return <Outlet />;
};

export default AdminRoute;