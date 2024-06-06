// frontend/src/components/Categories.js

import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryItem = styled.li`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: calc(33.333% - 10px);
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: calc(50% - 10px);
  }
`;

const Categories = ({ categories }) => {
  return (
    <Section>
      <Title>Catégories</Title>
      <CategoryList>
        {categories.map((category) => (
          <CategoryItem key={category}>{category}</CategoryItem>
        ))}
      </CategoryList>
    </Section>
  );
};

export default Categories;