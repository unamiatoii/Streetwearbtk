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
  };

  const handleLogin = (token, role) => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    if (role === 'admin') {
      setIsAdmin(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header isAuthenticated={isAuthenticated} isAdmin={isAdmin} onLogout={handleLogout} onLogin={handleLogin} />
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
                    <ArticlesPage />
                 }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
