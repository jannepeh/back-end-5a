const db = require("../db");

// Update user information
const updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, name } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }

    // Update the user in the database
    const [result] = await db.query(
      "UPDATE users SET email = ?, name = ? WHERE id = ?",
      [email, name, userId]
    );

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ message: "User not found or update failed" });
    }

    res.status(200).json({ message: "User info updated successfully" });
  } catch (error) {
    console.error("Error updating user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    // Only allow admins to access this route
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    const [users] = await db.query("SELECT id, email, name, role FROM users");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export functions
module.exports = { updateUserInfo, getAllUsers };
