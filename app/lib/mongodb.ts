const mongoose = require('mongoose');
const config = require('../utils/config');


const connectDB = async () => {
  await mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error: { message: any; }) => {
    console.error('error connection to MongoDB:', error.message)
  })
}

module.exports = connectDB;

