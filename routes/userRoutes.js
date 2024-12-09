const express = require("express");
const {
  updateUserInfo,
  getAllUsers,
} = require("../controllers/userController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Get all users (admin only).
 */
router.get("/", authenticateJWT, getAllUsers);

/**
 * Update user information.
 */
router.put("/", authenticateJWT, updateUserInfo);

module.exports = router;
