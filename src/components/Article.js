import React from 'react';
import styled from 'styled-components';

const ArticleWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 200px;
  text-align: center;

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ArticleTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1em;
  }
`;

const ArticlePrice = styled.p`
  font-size: 1em;
  color: #555;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const ArticleCategory = styled.p`
  font-size: 0.9em;
  color: #777;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

const Article = ({ article }) => {
  // Assurez-vous que l'URL de l'image est complète et correcte
  const imageUrl = `https://backend-cpi3.onrender.com/uploads/${article.imageUrl}`;

  return (
    <ArticleWrapper>
      {article.imageUrl && <ArticleImage src={imageUrl} alt={article.nom} />}
      <ArticleTitle>{article.nom}</ArticleTitle>
      <ArticlePrice>{article.prix} €</ArticlePrice>
      <ArticleCategory>{article.categorie}</ArticleCategory>
    </ArticleWrapper>
  );
};

export default Article;
