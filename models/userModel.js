const db = require("../db");

const updateUser = async (userId, email, name) => {
  const [result] = await db.query(
    "UPDATE users SET email = ?, name = ? WHERE id = ?",
    [email, name, userId]
  );
  return result.affectedRows > 0;
};

module.exports = { updateUser };
