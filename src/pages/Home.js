// frontend/src/pages/Home.js

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import Promotions from '../components/Promotions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    // Fetch featured products
    axios.get('https://backend-cpi3.onrender.com/api/products')
      .then(response => setFeaturedProducts(response.data))
      .catch(error => console.error('Error fetching featured products:', error));

    // Fetch categories
    axios.get('https://backend-cpi3.onrender.com/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch promotions
    axios.get('https://backend-cpi3.onrender.com/api/promotions')
      .then(response => setPromotions(response.data))
      .catch(error => console.error('Error fetching promotions:', error));
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <Container>
        <Categories categories={categories} />
        <FeaturedProducts products={featuredProducts} />
        <Promotions promotions={promotions} />
      </Container>
    </>
  );
};

export default Home;
