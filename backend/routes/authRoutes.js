const express = require("express");
const { body } = require("express-validator");
const { register, login, me } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Block obviously-fake / throwaway email patterns at the validator layer
// (still allows real-world emails while rejecting test@, a@b, single-letter, etc.)
const isProperEmail = (value) => {
  if (!/^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(value)) return false;
  const local = value.split("@")[0];
  if (local.length < 2) return false;
  return true;
};

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail().withMessage("Valid email is required")
      .custom(isProperEmail).withMessage("Please use a valid, properly formatted email address"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  register
);
router.post(
  "/login",
  [
    body("email")
      .isEmail().withMessage("Valid email is required")
      .custom(isProperEmail).withMessage("Please use a valid, properly formatted email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);
router.get("/me", protect, me);

module.exports = router;
