// frontend/src/pages/Products.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 150px;
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  margin-top: 10px;
  @media (min-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 0;
    margin-left: 20px;
  }
`;

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://backend-cpi3.onrender.com/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <Container>
      <h1>Liste des produits</h1>
      <ProductList>
        {products.map(product => (
          <ProductItem key={product._id}>
            <ProductImage src={product.imageUrl} alt={product.nom} />
            <ProductDetails>
              <h2>{product.nom}</h2>
              <p>{product.description}</p>
              <p>{product.prix} €</p>
            </ProductDetails>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
}

export default Products;
