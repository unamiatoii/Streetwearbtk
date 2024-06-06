// frontend/src/components/Categories.js

import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h2`
  margin-bottom: 10px;
  text-align: center;
  font-size: 1.8em;
  color: ${(props) => props.theme.colors.primaryDark};
`;

const CategoryList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 0;
`;

const CategoryItem = styled.li`
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: calc(33.333% - 20px);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: calc(50% - 20px);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
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
