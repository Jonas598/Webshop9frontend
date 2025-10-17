import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
const isAdminAuthenticated = !!localStorage.getItem("adminAuthtoken");

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin-login" replace />;
    }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;