const db = require("../config/db");

const checkBoardAdmin = async (req, res, next) => {
  const userId = req.user.id;
  const boardId = req.params.boardId;
  try {
    const [rows] = await db.query(
      "SELECT role FROM board_members WHERE user_id = ? AND board_id = ?",
      [userId, boardId]
    );
    if (rows.length === 0 || rows[0].role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Permission check failed", error });
  }
};

module.exports = checkBoardAdmin;