const db = require("../config/db");

const inviteUserByEmail = async (req, res) => {
  const { boardId } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Find user by email
    const [userResult] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ message: "User not found with this email" });
    }

    const userIdToInvite = userResult[0].id;

    // Check if already a board member
    const [existing] = await db.query(
      "SELECT * FROM board_members WHERE board_id = ? AND user_id = ?",
      [boardId, userIdToInvite]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "User is already a member of this board" });
    }

    // Add to board_members
    await db.query(
      "INSERT INTO board_members (board_id, user_id, role) VALUES (?, ?, ?)",
      [boardId, userIdToInvite, "member"]
    );

    res.status(200).json({ message: "User successfully invited to board" });
  } catch (error) {
    console.error("Error inviting user by email:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = inviteUserByEmail;
