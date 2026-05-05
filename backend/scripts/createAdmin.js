require("dotenv").config();
const connectDB = require("../config/db");
const User = require("../models/User");
const mongoose = require("mongoose");

const createAdmin = async () => {
  await connectDB();
  
  const email = "admin@guleasr.com";
  const password = "adminpassword123";
  
  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log("Existing user promoted to admin:", email);
  } else {
    await User.create({
      name: "Admin User",
      email,
      password,
      role: "admin"
    });
    console.log("New admin user created:", email);
    console.log("Password:", password);
  }
  
  await mongoose.connection.close();
};

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
