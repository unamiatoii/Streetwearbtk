import React from 'react';
import styled from 'styled-components';
import Article from './Article';

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
`;

const ArticleList = ({ articles }) => {
  return (
    <ListWrapper>
      {articles.map(article => 
        article.nom && article.prix && article.categorie && (
          <Article key={article._id} article={article} />
        )
      )}
    </ListWrapper>
  );
};

export default ArticleList;
