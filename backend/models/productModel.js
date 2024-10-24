import mongoose from 'mongoose';

// Define the review schema
const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    // required: true,  // Ensure review text is provided
  },
  username: {
    type: String,
    // required: true,  // Ensure username is provided
  }
});

// Define the product schema
const productSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,  // Ensure the URL is unique to avoid duplicates
  },
  title: {
    type: String,
    required: true,
    minlength: 5,  // Title must be at least 5 characters long
    maxlength: 255, // Maximum length for title
  },
  description: {
    type: String,
    minlength: 10,  // Description must be at least 10 characters
    maxlength: 1000, // Maximum length for description
  },
  currentPrice: {
    type: String,
    required: true,
    min: 0,  // Price must be a non-negative number
  },
  reviews: [reviewSchema],  // Changed to an array of review objects
  priceHistory: [{
    price: { 
      type: String, 
      min: 0, 
    },
    timestamp: {
      type: Date,
      default: Date.now,  // Automatically set timestamp when price is added
    }
  }],
  productId: {
    type: String,
    unique: true,
    default: function () {
      return new mongoose.Types.ObjectId();  // Generate unique ID for each product
    }
  }
});

// Create the Product model from the schema
const Product = mongoose.model('Product', productSchema);

export default Product;
