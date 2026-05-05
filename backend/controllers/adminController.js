const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = asyncHandler(async (req, res) => {
  const [users, products, orders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.find(),
  ]);

  const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const monthlyRevenue = {};
  orders.forEach((order) => {
    const key = new Date(order.createdAt).toISOString().slice(0, 7);
    monthlyRevenue[key] = (monthlyRevenue[key] || 0) + order.totalAmount;
  });

  res.json({
    users,
    products,
    orders: orders.length,
    revenue,
    monthlyRevenue: Object.entries(monthlyRevenue).map(([month, total]) => ({ month, total })),
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { getDashboardStats, getUsers };
