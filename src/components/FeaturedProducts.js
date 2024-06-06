// frontend/src/components/FeaturedProducts.js

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 20px;
  background: #f9f9f9;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const ProductList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ProductItem = styled(motion.li)`
  background: white;
  padding: 10px;
  border-radius: 8px;
  width: calc(33.333% - 10px);

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: calc(50% - 10px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  font-size: 1.2em;
`;

const ProductPrice = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;

const FeaturedProducts = ({ products }) => {
  return (
    <Section>
      <Title>Produits en vedette</Title>
      <ProductList>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductImage src={product.imageUrl} alt={product.nom} />
            <ProductName>{product.nom}</ProductName>
            <ProductPrice>{product.prix} €</ProductPrice>
          </ProductItem>
        ))}
      </ProductList>
    </Section>
  );
};

export default FeaturedProducts;