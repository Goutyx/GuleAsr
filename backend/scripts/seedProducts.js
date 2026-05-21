require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const baseProducts = require("../data/products");

const run = async () => {
  const connected = await connectDB();
  if (!connected) throw new Error("MONGO_URI is required for seeding.");
  await Product.deleteMany();
  await Product.insertMany(baseProducts);
  console.log("Seeded 11 products successfully.");
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
