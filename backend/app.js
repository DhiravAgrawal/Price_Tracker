import dotenv from 'dotenv';
dotenv.config(); // Initialize dotenv to load environment variables
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import { connectToMongoDB } from './connection.js'; // Import MongoDB connection function

const app = express();
app.use(cors());
app.use(express.json());

// Use product routes
app.use('/api/products', productRoutes);

// Database connection
connectToMongoDB(process.env.MONGO_URI)
    .then(() => {
        console.log("DB connected"); // Log success message
    })
    .catch((err) => {
        console.log("DB not connected", err); // Log error message
    });

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

