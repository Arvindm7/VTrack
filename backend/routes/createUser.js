const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.post('/migrate', async (req, res) => {
    // Destructure user information from request body
    const { firebaseId, name, email, gender, age, phoneNumber } = req.body;
  
     // Check if any required fields are missing
    if (!firebaseId || !name || !email || !gender || !age || !phoneNumber) {
      return res.status(400).send('Missing required fields');
    }
  
    try {
      // Create a new user document
      const user = new User({
        firebaseId,
        name,
        email,
        gender,
        age,
        phoneNumber,
      });
  
      // Save the user document to MongoDB
      await user.save();
      res.status(200).send('User information saved to MongoDB');
    } catch (error) {
      console.error('Error saving user information:', error);
      res.status(500).send('Error saving user information');
    }
  });

  module.exports = router;