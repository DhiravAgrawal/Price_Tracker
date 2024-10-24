/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import ProductInput from './components/ProductInput';
import ProductDetail from './components/ProductDetail'; // Import the new detail page
import HomePage from './components/HomePage'; // Import the HomePage component
import axios from 'axios';
import server from './environment.js';
import "./index.css";

// Hook to check the current route, this will be used inside the Router context
const useCurrentPath = () => {
  const location = useLocation();
  return location.pathname;
};

const Layout = ({ handleAddProduct }) => {
  const currentPath = useCurrentPath(); // Get current path inside Layout

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom className="site-title">
          Flipkart Product Price Tracker
        </Typography>

        {/* Only show ProductInput on the homepage */}
        {currentPath === '/' && <ProductInput onAddProduct={handleAddProduct} />}

        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page */}
          <Route path="/products/:id" element={<ProductDetail />} /> {/* Product details */}
        </Routes>
      </Box>
    </Container>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${server}/api/products/`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post(`${server}/api/products/fetch`, productData);
      // Add the newly fetched product to the products state
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error);
    }
  };

  return (
    <Router>
      <Layout handleAddProduct={handleAddProduct} /> {/* Call Layout inside the Router */}
    </Router>
  );
};

export default App;
