/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import server from '../environment.js';
import "../index.css";
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${server}/api/products/`);
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially show all products
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]); // Add new product to the products array
    setFilteredProducts((prevFilteredProducts) => [...prevFilteredProducts, newProduct]); // Update filtered products
  };

  return (
    <div>
      <div className="header">
        <h1>Product Search</h1>
        <div className="search-bar-container">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="product-list">  {/* Merged product list here */}
        {filteredProducts.map(product => (
          <div key={product._id} className="product-card">  {/* Use product-card class */}
            <Link to={`/products/${product._id}`}>
              <h2 className="product-title">{product.title}</h2>  {/* Use product-title class */}
              <p className="product-price">{product.currentPrice}</p>  {/* Use product-price class */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
