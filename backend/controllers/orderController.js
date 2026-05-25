const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod = "Card", paymentStatus = "pending", razorpayOrderId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  const items = cart.items.map((entry) => ({
    product: entry.product._id,
    name: entry.product.name,
    image: entry.product.images[0],
    price: entry.product.price,
    quantity: entry.quantity,
  }));

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({
    user: req.user._id,
    items,
    totalAmount,
    shippingAddress,
    paymentMethod,
    paymentStatus,
    razorpayOrderId,
  });
  cart.items = [];
  await cart.save();
  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email phone")
    .populate("items.product", "name")
    .sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = { createOrder, getMyOrders, getAllOrders };
