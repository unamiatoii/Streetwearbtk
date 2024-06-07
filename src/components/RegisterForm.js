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

const RegisterForm = ({ handleClose, showNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://backend-cpi3.onrender.com/api/auth/register', {
        username,
        password,
        email,
        firstName,
        lastName,
        address: { street, city },
        phone,
        role: 'customer',
      });
      console.log('Registration successful:', response.data);
      showNotification('Registration successful!', 'success');
      handleClose();
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
      showNotification('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <StyledTextField
        variant="outlined"
        label="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        disabled={loading}
      />
      <StyledTextField
        variant="outlined"
        label="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        disabled={loading}
      />
      <StyledTextField
        variant="outlined"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <StyledTextField
        variant="outlined"
        label="Ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        disabled={loading}
      />
      <StyledTextField
        variant="outlined"
        label="Quartier"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
        disabled={loading}
      />
      <StyledTextField
        variant="outlined"
        label="Téléphone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        disabled={loading}
      />
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
        {loading ? <CircularProgress size={24} /> : "S'inscrire"}
      </StyledButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
};

export default RegisterForm;
