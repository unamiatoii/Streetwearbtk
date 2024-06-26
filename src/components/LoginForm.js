import React from 'react';
import styled from 'styled-components';
import { TextField, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const validationSchema = yup.object({
  username: yup.string('Enter your username').required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm = ({ handleClose, showNotification }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Sending login request with values:', values);
        const response = await axios.post('https://backend-cpi3.onrender.com/api/auth/login', values);
        console.log('Login response:', response);
        if (response.data.token && response.data.role) {
          const { token, role } = response.data;
          localStorage.setItem('authToken', token);
          localStorage.setItem('userRole', role);
          showNotification('Login successful!', 'success');
          handleClose();
          if (role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/store');
          }
        } else {
          showNotification('Login failed. Invalid response from server.', 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        showNotification('Login failed. Please check your credentials and try again.', 'error');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <StyledTextField
        variant="outlined"
        label="Nom d'utilisateur"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        required
        disabled={formik.isSubmitting}
      />
      <StyledTextField
        variant="outlined"
        label="Mot de passe"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        required
        disabled={formik.isSubmitting}
      />
      <StyledButton type="submit" disabled={formik.isSubmitting}>
        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Se connecter'}
      </StyledButton>
    </form>
  );
};

export default LoginForm;
