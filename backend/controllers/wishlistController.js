const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/Wishlist");

const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate("products");
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
};

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id);
  res.json(wishlist);
});

const toggleWishlistProduct = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const wishlist = await getOrCreateWishlist(req.user._id);
  const exists = wishlist.products.some((id) => id._id.toString() === productId);
  if (exists) wishlist.products = wishlist.products.filter((id) => id._id.toString() !== productId);
  else wishlist.products.push(productId);
  await wishlist.save();
  await wishlist.populate("products");
  res.json(wishlist);
});

module.exports = { getWishlist, toggleWishlistProduct };
