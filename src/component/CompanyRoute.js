import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const CompanyRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signIn);

  // Adjust the role check condition as needed (e.g., userInfo.role === 2 for "Company" role)
  return userInfo && userInfo.role === 2 ? (
    <Outlet /> // Render child components if authorized
  ) : (
    <Navigate to="/" /> // Redirect to unauthorized users
  );
};

export default CompanyRoute;
