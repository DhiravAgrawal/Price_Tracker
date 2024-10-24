/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import server from '../environment.js';  // Import the environment config
import "../index.css";

const ProductInput = ({ onAddProduct }) => {
  const [url, setUrl] = useState('');  // State to hold the product URL
  const [loading, setLoading] = useState(false);  // State to manage loading status
  const [error, setError] = useState(null);  // State to manage errors

  const fetchProduct = async () => {
    if (!url) return;  // Return if URL is empty

    setLoading(true);  // Set loading to true when the request is initiated
    try {
      // Make an Axios request to the backend using the provided URL
      const response = await axios.post(`${server}/api/products/fetch`, { url });
      
      // Call the callback function passed via props to update the product list
      onAddProduct(response.data);
      
      setUrl('');  // Clear the input field
      setError(null);  // Clear any previous error messages
    } catch (error) {
      console.error('Error fetching product details:', error);
      setError('Failed to fetch product details. Please try again.');  // Set error message
    } finally {
      setLoading(false);  // Reset the loading state once the request is complete
    }
    window.location.reload();
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Flipkart Product URL"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        disabled={loading}  // Disable input when loading
      />
      <Button
        onClick={fetchProduct}  // Use onClick event instead of onSubmit
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Fetch Product Details'}
      </Button>
      {error && <p className="error-text">{error}</p>}  {/* Display error message if any */}
    </Box>
  );
};

export default ProductInput;
