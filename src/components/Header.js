import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText, Snackbar, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import logo from '../assets/images/Logo.svg';
import LoginModal from './LoginModal';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: white;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const LogoImage = styled.img`
  height: 7rem;
  
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 5rem;
  }
`;

const DesktopNavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  list-style: none;

  .nav-links-container {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`;

const MobileNavContainer = styled.div`
  display: none;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

const NavLink = styled.li``;

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 15px 25px;
  background-color: white;
  color: ${(props) => props.theme.colors.lightText};
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
    color: white;
  }
`;

const LoginButton = styled.button`
  display: inline-block;
  padding: 15px 25px;
  background-color: green;
  color: white;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: darkgreen;
  }
`;

const LogoutButton = styled.button`
  display: inline-block;
  padding: 15px 25px;
  background-color: red;
  color: white;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

const MobileMenuButton = styled(IconButton)`
  color: white;
`;

const Header = ({ isAuthenticated, isAdmin, onLogin, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const showNotification = (message, severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post('https://backend-cpi3.onrender.com/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      onLogout();
      showNotification('Logout successful.', 'success');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Logout failed. Please try again.', 'error');
    }
  };

  const handleLoginSuccess = () => {
    onLogin();
    handleModalClose();
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/store');
    }
  };

  const drawerList = (
    <List>
      <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
        <ListItemText primary="Accueil" />
      </ListItem>
      {isAuthenticated ? (
        <ListItem button onClick={() => { handleLogout(); toggleDrawer(false)(); }}>
          <ListItemText primary="Déconnexion" />
        </ListItem>
      ) : (
        <ListItem button onClick={handleModalOpen}>
          <ListItemText primary="Se connecter / S'inscrire" />
        </ListItem>
      )}
    </List>
  );

  return (
    <Nav>
      <DesktopNavLinks>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <LogoImage src={logo} alt="Boutique Logo" />
        </Link>
        <div className="nav-links-container">
          <NavLink><ButtonLink to="/">Accueil</ButtonLink></NavLink>
          {isAuthenticated ? (
            <NavLink><LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton></NavLink>
          ) : (
            <NavLink><LoginButton onClick={handleModalOpen}>Se connecter / S'inscrire</LoginButton></NavLink>
          )}
        </div>
      </DesktopNavLinks>
      <MobileNavContainer>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <LogoImage src={logo} alt="Boutique Logo" />
        </Link>
        <MobileMenuButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </MobileMenuButton>
      </MobileNavContainer>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <LoginModal open={modalOpen} handleClose={handleModalClose} onLogin={handleLoginSuccess} />
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
        <Alert onClose={handleNotificationClose} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Nav>
  );
};

export default Header;
