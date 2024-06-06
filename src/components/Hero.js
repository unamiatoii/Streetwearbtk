// frontend/src/components/Hero.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('https://example.com/hero-image.jpg') no-repeat center center/cover;
  height: 400px;
  color: white;
  text-align: center;
  padding: 20px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 2.5em;
  margin: 0;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2em;
  margin: 10px 0 20px;
`;

const HeroButton = styled(motion.a)`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1em;
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Bienvenue à notre Boutique
      </HeroTitle>
      <HeroSubtitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Découvrez nos produits exclusifs et nos offres spéciales
      </HeroSubtitle>
      <HeroButton
        href="/products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        Commencez vos achats
      </HeroButton>
    </HeroSection>
  );
};

export default Hero;