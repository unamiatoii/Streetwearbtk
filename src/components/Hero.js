// frontend/src/components/Hero.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FaShoppingBag } from 'react-icons/fa';
import image1 from '../assets/images/back.svg';
import image2 from '../assets/images/hoodie.png';

const HeroSection = styled.section`
  margin-top: 5rem;
  background-image: url(${image1});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  color: white;
  text-align: center;
  padding: 20px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: auto;
    padding: 40px 20px;
  }
`;

const Column = styled.div`
  flex: 1;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color:  ${(props) => props.theme.colors.primaryDark};
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2em;
  width: 50%;
  margin-top: 20px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }

  svg {
    margin-left: 10px;
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: translateX(5px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 80%;
  }
`;

const Image = styled.img`
  width: 90%;
  height: auto;
  border-radius: 10px;
`;

const Hero = () => {
  return (
    <HeroSection>
      {/* Text and Image */}
      <Column>
        <HeroTitle
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Bienvenue chez Vintage Clothes
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Typewriter
            words={['Restez soins !', 'Rester frais !']}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </HeroSubtitle>
        <Image src={image2} alt="Streetwear" />
      </Column>

      {/* Button */}
      <HeroButton
        href="/products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.1 }}
      >
        Visiter la boutique <FaShoppingBag />
      </HeroButton>
    </HeroSection>
  );
};

export default Hero;
