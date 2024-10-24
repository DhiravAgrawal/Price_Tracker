import Product from '../models/productModel.js';
import { scrapeProduct } from '../services/productService.js';

// Controller: Add new product or notify if it already exists
export const addProduct = async (req, res) => {
  const { url } = req.body;

  try {
    // Check if the product already exists based on the URL
    const existingProduct = await Product.findOne({ url });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product details already exist for this URL.', product: existingProduct });
    }

    const productData = await scrapeProduct(url);
    console.log(productData);

    const newProduct = new Product({
      url,
      title: productData.title,
      description: productData.description,
      currentPrice: productData.price,
      reviews: productData.reviews,  // Updated to use productData.reviews
      priceHistory: [{ price: productData.price, timestamp: new Date() }],
    });

    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller: Get all products with their details
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller: Recheck the price of an existing product
export const recheckPrice = async (req, res) => {
  const { url } = req.body; // Assume you pass the URL in the body

  try {
    const product = await Product.findOne({ url });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProductData = await scrapeProduct(product.url);
    product.currentPrice = updatedProductData.price;
    product.priceHistory.push({
      price: updatedProductData.currentPrice,
      timestamp: new Date(),
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller: Search products by title or price range
export const searchProducts = async (req, res) => {
  const { title, minPrice, maxPrice } = req.query;
  const filter = {};

  if (title) {
    filter.title = { $regex: title, $options: 'i' };
  }

  if (minPrice && maxPrice) {
    filter.currentPrice = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters

  try {
    const product = await Product.findById(id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' }); // Handle not found case
    }
    res.status(200).json(product); // Return the product data
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' }); // Handle server errors
  }
}