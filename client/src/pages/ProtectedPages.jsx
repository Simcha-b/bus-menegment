import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedPages() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedPages;
