const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../models/authModel");
require("dotenv").config();

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Existing functions
const { updateMediaById, deleteMediaById } = require("../models/mediaModel");

const updateMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const result = await updateMediaById(
      mediaId,
      userId,
      title,
      description,
      req.user.role
    );
    if (!result) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to update this media item",
      });
    }

    res.status(200).json({ message: "Media updated successfully" });
  } catch (error) {
    console.error("Error in updateMedia:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    const userId = req.user.id;

    const result = await deleteMediaById(mediaId, userId, req.user.role);
    if (!result) {
      return res.status(403).json({
        message:
          "Forbidden: You do not have permission to delete this media item",
      });
    }

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMedia:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { login, updateMedia, deleteMedia };
