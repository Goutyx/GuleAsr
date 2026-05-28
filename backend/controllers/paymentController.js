const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");

const razorpay =
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      })
    : null;

const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Amount must be greater than 0");
  }
  if (!razorpay) {
    return res.json({
      mock: true,
      order: { id: `mock_order_${Date.now()}`, amount: Math.round(amount * 100), currency: "INR" },
      key: "rzp_test_mock",
    });
  }

  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100),
    currency: "INR",
    receipt: `guleasr_${Date.now()}`,
  });
  res.json({ order, key: process.env.RAZORPAY_KEY_ID });
});

const verifyRazorpayPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "mock_secret")
    .update(body)
    .digest("hex");

  const isValid = expected === razorpay_signature || String(razorpay_signature).startsWith("mock_signature");
  if (!isValid) {
    res.status(400);
    throw new Error("Payment signature verification failed");
  }

  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id, user: req.user._id });
  if (order) {
    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();
  }

  res.json({ verified: true });
});

module.exports = { createRazorpayOrder, verifyRazorpayPayment };
