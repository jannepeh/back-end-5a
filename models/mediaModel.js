const db = require("../db");

const updateMediaById = async (mediaId, userId, title, description, role) => {
  if (role === "admin") {
    const [result] = await db.query(
      "UPDATE media SET title = ?, description = ? WHERE id = ?",
      [title, description, mediaId]
    );
    return result.affectedRows > 0;
  } else {
    const [result] = await db.query(
      "UPDATE media SET title = ?, description = ? WHERE id = ? AND user_id = ?",
      [title, description, mediaId, userId]
    );
    return result.affectedRows > 0;
  }
};

const deleteMediaById = async (mediaId, userId, role) => {
  if (role === "admin") {
    const [result] = await db.query("DELETE FROM media WHERE id = ?", [
      mediaId,
    ]);
    return result.affectedRows > 0;
  } else {
    const [result] = await db.query(
      "DELETE FROM media WHERE id = ? AND user_id = ?",
      [mediaId, userId]
    );
    return result.affectedRows > 0;
  }
};

module.exports = { updateMediaById, deleteMediaById };
