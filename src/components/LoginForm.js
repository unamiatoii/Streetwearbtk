import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;

  .MuiInputBase-root {
    background-color: white;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .MuiInputLabel-root {
    color: ${(props) => props.theme.colors.lightText};
  }
`;

const StyledButton = styled.button`
  width: 50%;
  padding: 10px;
  background-color: white;
  color: black;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  font-weight: bold;
  margin-top: 20px;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primaryDark};
    color: white;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
`;

const LoginForm = ({ handleClose, navigate, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://backend-cpi3.onrender.com/api/auth/login', {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      showNotification('Login successful!', 'success');
      handleClose();
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
      showNotification('Login failed. Please check your credentials and try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <StyledTextField
        variant="outlined"
        label="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={loading}
      />
      <StyledTextField
        variant="outlined"
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <StyledButton type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Se connecter'}
      </StyledButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
};

export default LoginForm;
