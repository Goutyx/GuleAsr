const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGO_URI not set. Backend running without database connection.");
    return false;
  }

  await mongoose.connect(uri);
  console.log("MongoDB connected");
  return true;
};

module.exports = connectDB;
