// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../index.css";
import server from "../environment.js";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [updating, setUpdating] = useState(false); // Updating state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${server}/api/products/${id}`);
        setProduct(response.data); // Set product data
        console.log(response.data); // Log the product data to the console
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching product');
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchProduct(); // Call the fetch function
  }, [id]);

  const recheckPrice = async () => {
    setUpdating(true); // Set updating to true
    try {
      const response = await axios.post(`${server}/api/products/recheck`, { url: product.url });
      setProduct(prevProduct => ({
        ...prevProduct,
        currentPrice: response.data.currentPrice // Update product price with the new value
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Error rechecking price');
    } finally {
      setUpdating(false); // Set updating to false
    }
  };

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <div className="product-detail">
      <h1 className="product-info">{product?.title || 'No Title Available'}</h1>
    
      <div className="product-description">
        <p>{typeof product?.description === 'string' ? product?.description : 'No description available'}</p>
      </div>
      <div className="product-price">
        <p>
          Price: <span className="price">{product?.currentPrice || 'N/A'}</span>
        </p>
      </div>
      <div className="product-additional-info">
        <h2>Reviews</h2>
        <div className="reviews-container">
          {Array.isArray(product?.reviews) && product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div key={review._id} className="review-box">
                <p><strong>{review.username}</strong>: {review.reviewText}</p>
              </div>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </div>
        
        {/* Include any additional product information you have */}
        {product?.category && <p>Category: {product.category}</p>}
        {product?.brand && <p>Brand: {product.brand}</p>}
        {product?.rating && <p>Rating: {product.rating} / 5</p>}
      </div>
      <button className="primary-btn" onClick={recheckPrice} disabled={updating}>
        {updating ? 'Updating...' : 'Recheck Price'}
      </button>
    </div>
  );
};

export default ProductDetail;
