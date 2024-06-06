// frontend/src/pages/Admin.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

function Admin() {
  const [product, setProduct] = useState({
    nom: '',
    description: '',
    prix: '',
    categorie: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://backend-cpi3.onrender.com/api/products', product)
      .then(response => {
        alert('Produit créé avec succès');
        setProduct({ nom: '', description: '', prix: '', categorie: '', imageUrl: '' });
      })
      .catch(error => console.error('Error creating product:', error));
  };

  return (
    <Container>
      <h1>Admin</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nom"
          value={product.nom}
          onChange={handleChange}
          placeholder="Nom du produit"
        />
        <Input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description du produit"
        />
        <Input
          type="number"
          name="prix"
          value={product.prix}
          onChange={handleChange}
          placeholder="Prix du produit"
        />
        <Input
          type="text"
          name="categorie"
          value={product.categorie}
          onChange={handleChange}
          placeholder="Catégorie du produit"
        />
        <Input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="URL de l'image du produit"
        />
        <Button type="submit">Ajouter le produit</Button>
      </Form>
    </Container>
  );
}

export default Admin;
