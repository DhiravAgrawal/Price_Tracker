import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Function to connect to MongoDB using the provided URL
async function connectToMongoDB(url) {
    return mongoose.connect(url); // Establish connection to MongoDB
}

export { connectToMongoDB }; // Export the function for use in other modules
