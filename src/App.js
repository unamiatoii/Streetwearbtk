import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theme';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Simulate authentication status
    const user = {
      isAuthenticated: true, // Simulate user authentication status
      isAdmin: false, // Simulate user admin status
    };

    setIsAuthenticated(user.isAuthenticated);
    setIsAdmin(user.isAdmin);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
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
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Admin />
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
