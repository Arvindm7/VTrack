const express = require('express');
const Driver = require('../models/drivers');

const driverRouter = express.Router();

// Create a new driver
// Create a new driver
driverRouter.post('/drivers', async (req, res) => {
    // Destructure driver information from request body
    const { firebaseId, name, licenseNumber, gender, age, vehicle, status } = req.body;

    // Check if any required fields are missing
    if (!firebaseId || !name || !licenseNumber || !gender || !age || !vehicle || !status) {
        return res.status(400).send('Missing required fields');
    }
    try {
        // Create a new driver document
        const driver = new Driver({
            firebaseId,
            name,
            gender,
            age,
            vehicle, // Add this line
            licenseNumber, // Add this line
            status // Add this line if status is also required in your schema
        });

        // Save the driver document
        await driver.save();
        res.status(200).send('Driver information saved to MongoDB');
    } catch (error) {
        console.error('Error saving driver information:', error);
        res.status(500).send('Error saving driver information');
    }
});

// // Get all drivers
// router.get('/driv', async (req, res) => {
//     try {
//         const drivers = await Driver.find({});
//         res.send(drivers);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

// // Get a driver by ID
// router.get('/:id', async (req, res) => {
//     const _id = req.params.id;
//     try {
//         const driver = await Driver.findById(_id);
//         if (!driver) {
//             return res.status(404).send();
//         }
//         res.send(driver);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

// // Update a driver by ID
// router.patch('/:id', async (req, res) => {
//     const updates = Object.keys(req.body);
//     try {
//         const driver = await Driver.findById(req.params.id);
//         if (!driver) {
//             return res.status(404).send();
//         }
//         updates.forEach((update) => driver[update] = req.body[update]);
//         await driver.save();
//         res.send(driver);
//     } catch (e) {
//         res.status(400).send(e);
//     }
// });

// // Delete a driver by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const driver = await Driver.findByIdAndDelete(req.params.id);
//         if (!driver) {
//             return res.status(404).send();
//         }
//         res.send(driver);
//     } catch (e) {
//         res.status(500).send();
//     }
// });

module.exports = driverRouter;