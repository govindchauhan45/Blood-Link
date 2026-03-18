const mongoose = require('mongoose');

async function connectDB(uri) {
  const MONGO_URI = uri || process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blood-donation';
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    throw err;
  }
}

module.exports = { connectDB };
