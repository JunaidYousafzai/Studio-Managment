const express = require("express")
const app = express();
const router= express.Router();
const authenticateUser = require("../middlewares/authenticateUser")

const {
    createBoard,
    getUserBoards,
    getBoardMembers,
    updateBoard,
    deleteBoard,
    joinBoardByCode
} = require("../controller/board.controller");
const { createColumn, getBoardColumns, updateColumn, deleteColumn } = require("../controller/column.controller");
// const { route } = require("./auth.route");
const checkBoardAdmin = require("../middlewares/checkBoardAdmin");


// Board 
router.post("/",authenticateUser,createBoard)
router.post("/join", authenticateUser, joinBoardByCode);

router.get("/",authenticateUser,getUserBoards)
router.get("/:boardId/members",authenticateUser,getBoardMembers)
router.delete("/:boardId",authenticateUser,checkBoardAdmin,deleteBoard)
router.put("/:boardId",authenticateUser,checkBoardAdmin,updateBoard)


router.post("/:boardId/invite-email", authenticateUser, checkBoardAdmin, async (request, response) => {
  const { email } = request.body;
  const boardId = request.params.boardId;

  try {
    const [[board]] = await db.query("SELECT name, invite_code FROM boards WHERE id = ?", [boardId]);
    await sendInviteEmail(email, board.name, board.invite_code);
    response.status(200).json({ message: "Invitation email sent!" });
  } catch (error) {
    response.status(500).json({ message: "Failed to send invite email", error });
  }
});



// Board Column

router.post("/:boardId/columns", authenticateUser, createColumn);
router.get("/:boardId/columns", authenticateUser, getBoardColumns);
router.put("/columns/:columnId", authenticateUser, updateColumn);
router.delete("/columns/:columnId", authenticateUser, deleteColumn);




module.exports = router;
