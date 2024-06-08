import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, Fade, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import logo from '../assets/images/Logo.svg';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './LoginModal.css';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 50px 20px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25vw;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 90%;
    max-height: 90vh;
  }
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.colors.lightText};
  img {
    height: 50px;
  }
`;

const ToggleFormLink = styled.p`
  color: ${(props) => props.theme.colors.lightText};
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ToggleButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  color: black;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 8px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primaryDark};
    color: white;
  }
`;

const LoginModal = ({ open, handleClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleLoginSuccess = (token, role) => {
    onLogin(token, role);
    handleClose();
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/store');
    }
  };

  return (
    <>
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
                {isLogin ? 'Ivorian French Plug' : 'Créer un compte'}
                <img src={logo} alt="Logo" />
              </Title>
              <CSSTransition
                in={isLogin}
                timeout={300}
                classNames="form"
                unmountOnExit
              >
                <LoginForm handleClose={handleClose} showNotification={showNotification} onLoginSuccess={handleLoginSuccess} />
              </CSSTransition>
              <CSSTransition
                in={!isLogin}
                timeout={300}
                classNames="form"
                unmountOnExit
              >
                <RegisterForm handleClose={handleClose} showNotification={showNotification} />
              </CSSTransition>
            </ModalContent>
            <ToggleButtonsWrapper>
              <ToggleButton onClick={() => setIsLogin(true)}>
                J'ai déjà un compte
              </ToggleButton>
              <ToggleButton onClick={() => setIsLogin(false)}>
                Créer un compte
              </ToggleButton>
            </ToggleButtonsWrapper>
          </ModalWrapper>
        </Fade>
      </Modal>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
