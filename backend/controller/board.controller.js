const { response } = require("express");
const db = require("../config/db")


const generateInviteCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();

const createBoard = async (request, response) => {
  const userId = request.user.id;
  const { name } = request.body;

  if (!name) return response.status(400).json({ message: "Board name is required" });

  const inviteCode = generateInviteCode();

  try {
    const [resultponse] = await db.query(
      "INSERT INTO boards (name, created_by, invite_code) VALUES (?, ?, ?)",
      [name, userId, inviteCode]
    );

    const boardId = resultponse.insertId;

   
    await db.query(
      "INSERT INTO board_members (board_id, user_id, role) VALUES (?, ?, 'admin')",
      [boardId, userId]
    );

    response.status(201).json({ message: "Board created", boardId, inviteCode });
  } catch (error) {
    console.error("Error creating board:", error);
    response.status(500).json({ message: "Server error", error: error.message });
  }
};


const joinBoardByCode = async (request, response) => {
  const userId = request.user.id;
  const { code } = request.body;

  try {
    const [boards] = await db.query("SELECT * FROM boards WHERE invite_code = ?", [code]);

    if (boards.length === 0) {
      return response.status(404).json({ message: "Invalid invite code" });
    }

    const board = boards[0];
    const [existing] = await db.query(
      "SELECT * FROM board_members WHERE board_id = ? AND user_id = ?",
      [board.id, userId]
    );
    if (existing.length > 0) {
      return response.status(400).json({ message: "You are already a member of this board" });
    }
    await db.query(
      "INSERT INTO board_members (board_id, user_id, role) VALUES (?, ?, 'member')",
      [board.id, userId]
    );

    response.status(200).json({ message: "Joined board successfully", boardId: board.id });
  } catch (error) {
    console.error("Error joining board:", error);
    response.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserBoards = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const [boards] = await db.query(
      `SELECT b.id, b.name, b.invite_code, bm.role, b.created_by, b.created_at 
       FROM boards b
       JOIN board_members bm ON b.id = bm.board_id
       WHERE bm.user_id = ?`,
      [userId]
    );

    response.json(boards);
  } catch (error) {
    console.error("Error getting user boards:", error);
    response.status(500).json({ message: "Error getting user Boards", error: error.message });
  }
};



const getBoardMembers = async (request, response, next) => {
  try {
    const { boardId } = request.params;


    const userId = request.user.id;
    const [check] = await db.query(
      "SELECT * FROM board_members WHERE board_id = ? AND user_id = ?",
      [boardId, userId]
    );
    if (!check.length) return response.status(403).json({ error: "Not authorized" });


    const [members] = await db.query(
      `SELECT bm.user_id, bm.role, bm.joined_at, u.username, u.email
       FROM board_members bm
       JOIN users u ON bm.user_id = u.id
       WHERE bm.board_id = ?`,
      [boardId]
    );

    response.json(members);
  } catch (error) {
    response.json({message:`Error gettting Board Member`,error})
  }
};


deleteBoard = async (request, response) => {
const boardId = request.params.boardId;

  console.log(boardId,"boardId")
  try {

    await db.query('DELETE FROM columns WHERE board_id = ?', [boardId]);


    await db.query('DELETE FROM boards WHERE id = ?', [boardId]);

    response.status(200).json({ message: 'Board deleted successfully' });
  } catch (err) {
    console.error('Error deleting board:', err);
    response.status(500).json({ message: 'Server error' });
  }
};




const updateBoard = async (request, response) => {
  const boardId = request.params.boardId;

  const { name } = request.body;

  if (!name) {
    return response.status(400).json({ message: 'Board name is required' });
  }

  try {
    await db.query('UPDATE boards SET name = ? WHERE id = ?', [name, boardId]);
    response.status(200).json({ message: 'Board updated successfully' });
  } catch (err) {
    console.error('Error updating board:', err);
    response.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createBoard,
  joinBoardByCode,
  getUserBoards,
  getBoardMembers,
  deleteBoard,
  updateBoard
};