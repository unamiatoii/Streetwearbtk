// frontend/src/components/LoginModal.js

import React from 'react';
import styled from 'styled-components';
import { Modal, Fade, TextField } from '@mui/material';
import logo from '../assets/images/Logo.svg'; // Adjust the path as necessary

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ModalContent = styled.div`
  background-color: black;
  border-radius: 8px;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 400px;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  color: white;
  img {
    height: 40px; // Adjust the size of the logo as needed
  }
`;

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

const LoginModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Fade in={open}>
        <ModalWrapper>
          <ModalContent>
            <Title>
              <img src={logo} alt="Logo" />
              Connectez-vous 
              <img src={logo} alt="Logo" />
            </Title>
            <form>
              <StyledTextField
                variant="outlined"
                label="Nom d'utilisateur"
                required
              />
              <StyledTextField
                variant="outlined"
                label="Mot de passe"
                type="password"
                required
              />
              <StyledButton type="submit">Connexion</StyledButton>
            </form>
          </ModalContent>
        </ModalWrapper>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
