const asyncHandler = require("express-async-handler");
const Cart = require("../models/Cart");

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const cart = await getOrCreateCart(req.user._id);
  const existing = cart.items.find((item) => item.product._id.toString() === productId);
  if (existing) existing.quantity += Number(quantity);
  else cart.items.push({ product: productId, quantity: Number(quantity) });
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.find((entry) => entry.product._id.toString() === req.params.productId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found in cart");
  }
  item.quantity = Number(quantity);
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = cart.items.filter((entry) => entry.product._id.toString() !== req.params.productId);
  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
