const express = require("express");
const { getWishlist, toggleWishlistProduct } = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getWishlist);
router.post("/toggle", toggleWishlistProduct);

module.exports = router;
