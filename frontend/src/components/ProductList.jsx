/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";

const ProductList = ({ products }) => {
  return (
    <div className="product-list">  {/* Applied product-list class */}
      {products.map(product => (
        <div key={product._id} className="product-card">  {/* Applied product-card class */}
          <Link to={`/products/${product._id}`}>
            <h2 className="product-title">{product.title}</h2>  {/* Applied product-title class */}
            <p className="product-price">{product.currentPrice}</p>  {/* Applied product-price class */}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
