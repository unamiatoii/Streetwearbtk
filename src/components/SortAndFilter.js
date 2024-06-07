import React, { useState } from 'react';
import styled from 'styled-components';

const SortAndFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 10px;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;

  @media (max-width: 768px) {
    width: 90%;
    margin-bottom: 10px;
  }
`;

const SortAndFilter = ({ onSearch, onSort, onCategoryFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    onSort(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    onCategoryFilter(event.target.value);
  };

  return (
    <SortAndFilterWrapper>
      <SearchInput 
        type="text" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearchChange} 
      />
      <Select value={sortOption} onChange={handleSortChange}>
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </Select>
      <Select value={categoryFilter} onChange={handleCategoryFilterChange}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
        {/* Add more categories as needed */}
      </Select>
    </SortAndFilterWrapper>
  );
};

export default SortAndFilter;
