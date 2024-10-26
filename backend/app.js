import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { connectToMongoDB } from './connection.js'; // Import MongoDB connection function

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Use product routes
app.use('/api/products', productRoutes);

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected"); // Log success message
    })
    .catch((err) => {
        console.error("DB not connected", err); // Log error message
    });

// Start server
const PORT = process.env.PORT || 5000; // Use PORT from environment variable or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log server running message
});
