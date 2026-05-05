const express = require("express");
const { createOrder, getMyOrders, getAllOrders } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createOrder);
router.get("/my", getMyOrders);
router.get("/", adminOnly, getAllOrders);

module.exports = router;
