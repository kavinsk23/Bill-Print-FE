import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  if (false) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthGuard;
