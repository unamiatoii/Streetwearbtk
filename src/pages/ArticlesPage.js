import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArticleList from './../components/ArticleList';
import SortAndFilter from './../components/SortAndFilter';
import axios from 'axios';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://backend-cpi3.onrender.com/api/products');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const filteredAndSortedArticles = articles
    .filter(article => 
      article.nom && 
      article.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? article.categorie === categoryFilter : true)
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.prix - b.prix;
      if (sortOption === 'price-desc') return b.prix - a.prix;
      return 0;
    });

  return (
    <>
     
      <PageWrapper>
        <Title>Articles</Title>
        <SortAndFilter 
          onSearch={handleSearch} 
          onSort={handleSort} 
          onCategoryFilter={handleCategoryFilter} 
        />
        <ArticleList articles={filteredAndSortedArticles} />
      </PageWrapper>
    </>
  );
};

export default ArticlesPage;
