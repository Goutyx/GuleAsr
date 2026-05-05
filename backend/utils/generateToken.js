const jwt = require("jsonwebtoken");

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET || "dev_secret", {
    expiresIn: "7d",
  });

module.exports = generateToken;
