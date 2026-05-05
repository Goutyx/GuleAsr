require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const baseProducts = require("../data/products");

const categories = ["Floral", "Woody", "Fresh", "Oriental", "Citrus"];

const buildCatalog = () => {
  const products = [...baseProducts];
  for (let i = 1; i <= 19; i += 1) {
    products.push({
      name: `GuleAsr Essence ${i}`,
      category: categories[i % categories.length],
      type: i <= 14 ? "perfume" : "oil",
      price: 1800 + i * 120,
      description: "A premium blend crafted for long-lasting luxury wear.",
      images: [baseProducts[i % baseProducts.length].images[0]],
      stock: 15 + (i % 8),
      featured: i % 5 === 0,
      notes: ["Bergamot", "Rose", "Amber"],
    });
  }
  return products.slice(0, 25);
};

const run = async () => {
  const connected = await connectDB();
  if (!connected) throw new Error("MONGO_URI is required for seeding.");
  await Product.deleteMany();
  await Product.insertMany(buildCatalog());
  console.log("Seeded 25 products (20 perfumes + 5 oils pattern included).");
  await mongoose.connection.close();
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
