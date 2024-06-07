import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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

const MobileMenuButton = styled(IconButton)`
  color: white;
`;

const Header = ({ isAuthenticated, isAdmin, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    onLogout();
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
            <NavLink><ButtonLink onClick={handleLogout}>Déconnexion</ButtonLink></NavLink>
          ) : (
            <NavLink><ButtonLink onClick={handleModalOpen}>Se connecter / S'inscrire</ButtonLink></NavLink>
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
      <LoginModal open={modalOpen} handleClose={handleModalClose} />
    </Nav>
  );
};

export default Header;
