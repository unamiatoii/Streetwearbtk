// frontend/src/components/Promotions.js

import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 20px;
  background: #fff3e0;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const PromotionList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PromotionItem = styled.li`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: calc(33.333% - 10px);
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: calc(50% - 10px);
  }
`;

const Promotions = ({ promotions }) => {
  return (
    <Section>
      <Title>Promotions</Title>
      <PromotionList>
        {promotions.map((promotion) => (
          <PromotionItem key={promotion}>{promotion}</PromotionItem>
        ))}
      </PromotionList>
    </Section>
  );
};

export default Promotions;
