# Product Scraper Application

## Project Description
This project is a full-stack application that allows users to scrape product details from Flipkart. It consists of a frontend built with React and a backend powered by Node.js and Express. The application fetches product information, including prices and reviews, and displays them in a user-friendly interface. Users can also recheck the product price to get the latest updates.

## Features
- Search and view products from Flipkart.
- Display detailed product information including title, description, price, and reviews.
- Recheck product prices to ensure users have the latest information.

## Tech Stack
- **Frontend**: 
  - React
  - Axios
  - React Router
  - CSS

- **Backend**: 
  - Node.js
  - Express
  - MongoDB (for storing product data)
  - Axios (for making HTTP requests to scrape product details)

- **Others**:
  - dotenv (for environment variable management)



## How to Run the Application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DhiravAgrawal/Price_Tracker.git
   cd your-repo-name
    ```

2. **Setup Backend:**
- Navigate to the backend folder:
   ```bash
   cd backend
   ```

- Install backend dependencies:
   ```bash
   npm install
   ```
- Create a .env file in the backend directory and add your   environment variables:
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000

- Start the backend server
   ```bash
   npm start
   ```

3. **Setup Frontend:**
- Open a new terminal and navigate to the frontend folder:
```bash
   cd frontend
   ```
- Install frontend dependencies:
```bash
   npm install
   ```
- Start the frontend application:
```bash
   npm start
   ```

4. **Access the Application:**
- Open your browser and go to http://localhost:3000 to view the application.

