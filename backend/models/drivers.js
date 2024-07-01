const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'], // 'location.type' must be 'Point'
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    status: {
        type: String,
        enum: ['AVAILABLE', 'ON_TRIP'],
        default: 'AVAILABLE',
    },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);