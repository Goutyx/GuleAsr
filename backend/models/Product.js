const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: {
    type: String,
    required: true,
    enum: ["Floral", "Woody", "Fresh", "Oriental", "Citrus"],
  },
  type: { type: String, required: true, enum: ["perfume", "oil"] },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  reviewsCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  notes: [{ type: String, default: "" }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
