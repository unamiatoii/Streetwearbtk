import React from 'react';
import styled from 'styled-components';
import { TextField, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object({
  username: yup.string('Enter your username').required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  firstName: yup.string('Enter your first name').required('First name is required'),
  lastName: yup.string('Enter your last name').required('Last name is required'),
  street: yup.string('Enter your street').required('Street is required'),
  city: yup.string('Enter your city').required('City is required'),
  phone: yup.string('Enter your phone number').required('Phone number is required'),
});

const RegisterForm = ({ handleClose, showNotification }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://backend-cpi3.onrender.com/api/auth/register', {
          username: values.username,
          password: values.password,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          address: { street: values.street, city: values.city },
          phone: values.phone,
          role: 'customer',
        });
        console.log('Registration successful:', response.data);
        showNotification('Registration successful!', 'success');
        handleClose();
      } catch (error) {
        console.error('Registration failed:', error);
        showNotification('Registration failed. Please try again.', 'error');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <StyledTextField
        variant="outlined"
        label="Nom"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        required
        disabled={formik.isSubmitting}
      />
      <StyledTextField
        variant="outlined"
        label="Prénom"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        required
        disabled={formik.isSubmitting}
      />
      <StyledTextField
        variant="outlined"
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        required
        disabled={formik.isSubmitting}
      />
      <StyledTextField
        variant="outlined"
        label="Ville"
        name="city"
        value={formik.values.city}
        onChange={formik.handleChange}
        error={formik.touched.city && Boolean(formik.errors.city)}
        helperText={formik.touched.city && formik.errors.city}
        required
        disabled={formik.isSubmitting}
      />
      <StyledTextField
        variant="outlined"
        label="Quartier"
        name="street"
        value={formik.values.street}
        onChange={formik.handleChange}
        error={formik.touched.street && Boolean(formik.errors.street)}
        helperText={formik.touched.street && formik.errors.street}
        required
        disabled={formik.isSubmitting}
      />
      <StyledTextField
        variant="outlined"
        label="Téléphone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
        required
        disabled={formik.isSubmitting}
      />
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
        {formik.isSubmitting ? <CircularProgress size={24} /> : "S'inscrire"}
      </StyledButton>
    </form>
  );
};

export default RegisterForm;
