import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const isConnected = () => localStorage.getItem("user");
function ProtectedPages() {
  return isConnected() ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedPages;