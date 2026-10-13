const express = require("express");
const { createRazorpayOrder, verifyRazorpayPayment, markPaymentFailed } = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/create-order", createRazorpayOrder);
router.post("/verify", verifyRazorpayPayment);
router.post("/failed", markPaymentFailed);

module.exports = router;
