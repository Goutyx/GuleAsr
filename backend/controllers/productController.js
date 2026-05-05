const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res) => {
  const { category, type, sort = "newest", minPrice, maxPrice, featured } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (type) filter.type = type;
  if (featured === "true") filter.featured = true;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  let query = Product.find(filter);
  if (sort === "price_asc") query = query.sort({ price: 1 });
  else if (sort === "price_desc") query = query.sort({ price: -1 });
  else if (sort === "popularity") query = query.sort({ rating: -1, reviewsCount: -1 });
  else query = query.sort({ createdAt: -1 });

  const products = await query;
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  await product.deleteOne();
  res.json({ message: "Product deleted" });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
