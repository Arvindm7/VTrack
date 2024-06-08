const express = require('express');
const admin = require('firebase-admin');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');// CORS middleware
const User = require('./models/users');// User model
const connectDB = require('./db/db'); // Import the database connection
const routes = require('./routes/createUser'); // Import the routes

// Load Firebase service account key from environment variables
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = 3000;

app.use(cors());// Enable Cross-Origin Resource Sharing (CORS)
app.use(express.json());// Middleware to parse JSON request bodies

// Use the routes
app.use('/api', routes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
