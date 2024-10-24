import express from 'express';
import {
  addProduct,
  recheckPrice,
  getAllProducts,
  searchProducts,
  getProductById // Add this if you have a function to get a product by its ID
} from '../controllers/productController.js';

const router = express.Router();

// Route: Add a new product
router.post('/fetch', addProduct);

// Route: Recheck the price of a specific product
router.post('/recheck', recheckPrice);

// Route: Get all products
router.get('/', getAllProducts);

// Route: Search products based on query
router.get('/search', searchProducts);

// Route: Get product by ID (optional, if needed)
router.get('/:id', getProductById); // Uncomment if you have a controller for getting a single product by ID

export default router;
