const express = require("express");
const { getDashboardStats, getUsers } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly);
router.get("/stats", getDashboardStats);
router.get("/users", getUsers);

module.exports = router;
