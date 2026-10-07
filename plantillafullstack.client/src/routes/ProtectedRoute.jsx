import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  const isExpired = new Date().getTime() > new Date(expiresAt).getTime();

  if (!token || !expiresAt) {
    return <Navigate to="/admin/login" replace />;
  }


  if (isExpired) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
