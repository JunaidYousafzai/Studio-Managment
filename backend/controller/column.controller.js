const db = require("../config/db"); 


const createColumn = async (request, response) => {
  try {
    const { boardId } = request.params;
    const { name, position } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Column name is required" });
    }

    const [result] = await db.query(
      `INSERT INTO columns (board_id, name, position) VALUES (?, ?, ?)`,
      [boardId, name, position || 0]
    );

    const [newColumn] = await db.query(
      `SELECT * FROM columns WHERE id = ?`,
      [result.insertId]
    );

    response.status(201).json(newColumn[0]);
    
  } catch (error) {
    console.error("Error creating column:", error);
    response.status(500).json({ error: "Server error" });
  }
};



const getBoardColumns = async (request, response) => {
  try {
    const { boardId } = request.params;

    const [columns] = await db.query(
      `SELECT * FROM columns WHERE board_id = ? ORDER BY position ASC`,
      [boardId]
    );

    response.json(columns);
  } catch (error) {
    console.error("Error fetching columns:", error);
    response.status(500).json({ error: "Server error" });
  }
};



const updateColumn = async (request, response) => {
  try {
    const { columnId } = request.params;
    const { name, position } = request.body;

    const [existing] = await db.query(`SELECT * FROM columns WHERE id = ?`, [columnId]);
    if (!existing.length) {
      return response.status(404).json({ error: "Column not found" });
    }

    const updatedName = name || existing[0].name;
    const updatedPosition = position ?? existing[0].position;

    await db.query(
      `UPDATE columns SET name = ?, position = ? WHERE id = ?`,
      [updatedName, updatedPosition, columnId]
    );

    const [updatedColumn] = await db.query(`SELECT * FROM columns WHERE id = ?`, [columnId]);
    response.json(updatedColumn[0]);
  } catch (error) {
    console.error("Error updating column:", error);
    response.status(500).json({ error: "Server error" });
  }
};



const deleteColumn = async (request, response) => {
  try {
    const { columnId } = request.params;

    const [result] = await db.query(`DELETE FROM columns WHERE id = ?`, [columnId]);

    if (result.affectedRows === 0) {
      return response.status(404).json({ error: "Column not found" });
    }

    response.json({ message: "Column deleted successfully" });
  } catch (error) {
    console.error("Error deleting column:", error);
    response.status(500).json({ error: "Server error" });
  }
};


module.exports = {
  createColumn,
  getBoardColumns,
  updateColumn,
  deleteColumn,
};
