const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');
    await Topic.seedSampleTopics()
    await User.createDefaultAdmin();
  } catch (err) {
    console.error("err connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
