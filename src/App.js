import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theme';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import ArticlesPage from './pages/ArticlesPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Lecture des informations d'authentification et de rôle à partir du localStorage
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');

    if (token) {
      setIsAuthenticated(true);
      if (role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    // Add any additional logout logic here (e.g., API call to revoke token)
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
         <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated && isAdmin}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ArticlesPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
