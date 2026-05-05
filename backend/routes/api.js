const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit an order
router.post('/orders', async (req, res) => {
  try {
    // Basic mock order submission endpoint
    const { items, total, shippingInfo } = req.body;
    res.status(201).json({ message: 'Order created successfully', orderId: Date.now() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
