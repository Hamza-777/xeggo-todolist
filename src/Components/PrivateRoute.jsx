import React from 'react';
import { checkAuth } from '../LocalStorage/localStorage';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const auth = checkAuth();
  return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;