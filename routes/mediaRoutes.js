const express = require("express");
const { updateMedia, deleteMedia } = require("../controllers/mediaController");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/:id", authenticateJWT, updateMedia);
router.delete("/:id", authenticateJWT, deleteMedia);

module.exports = router;
