import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import EmployeeDetails from "../components/EmployeeDetails";

const PrivateRoute = () => {
  const auth = Cookies.get("task||userInfo");

  let user = null;

  if (auth) user = jwtDecode(auth);

  console.log("Role: " + user.role);

  return !auth ? (
    <Navigate to="/login" />
  ) : user?.role?.toLowerCase() === "manager" ? (
    <Outlet />
  ) : (
    <EmployeeDetails />
  );
};

export default PrivateRoute;
