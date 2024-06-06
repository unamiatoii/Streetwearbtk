// frontend/src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if the user is authenticated
  return children;
};

export default ProtectedRoute;