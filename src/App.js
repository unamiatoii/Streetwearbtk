// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theme';
import Home from './pages/Home';
import Products from './pages/Products';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/store" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;