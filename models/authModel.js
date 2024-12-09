const db = require("../db");

const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};

const createUser = async (email, hashedPassword, role = "user") => {
  const [result] = await db.query(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, hashedPassword, role]
  );
  return { id: result.insertId, email, password: hashedPassword, role };
};

module.exports = { findUserByEmail, createUser };
