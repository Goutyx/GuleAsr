const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    image: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      line1: String,
      city: String,
      postalCode: String,
      state: String,
      country: String,
    },
    paymentMethod: { type: String, enum: ["UPI", "Card", "COD"], default: "Card" },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
    orderStatus: { type: String, enum: ["placed", "processing", "shipped", "delivered"], default: "placed" },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
