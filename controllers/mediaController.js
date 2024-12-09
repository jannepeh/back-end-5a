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

module.exports = { updateMedia, deleteMedia };
