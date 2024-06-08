const mongoose = require('mongoose');
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL;

const connectDB = async ()=>{
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.error('MongoDB connection error:', error);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;