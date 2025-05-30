const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/authenticateUser");
const upload = require("../middlewares/upload"); 

const {

    addTasks,
    getTasksByColumn,
    allTasks,
    editTask,
    deleteTask,
    uploadFileToTask,
    getSingleTask
} = require("../controller/user.controller");

const { editProfile, getProfile } = require("../controller/profile.controller");


// Profile
router.get("/profile", authenticateUser, getProfile);
router.put("/profile", authenticateUser, editProfile);

// Tasks
router.get("/tasks", authenticateUser, allTasks);
router.post("/columns/:columnId/tasks", authenticateUser, addTasks);
router.get("/tasks/:id", authenticateUser, getSingleTask);
router.get("/columns/:columnId/tasks", authenticateUser, getTasksByColumn);
router.put("/tasks/:id", authenticateUser, editTask);
router.delete("/tasks/:id", authenticateUser, deleteTask);

// File Uploads


router.post(
  '/tasks/:taskId/attachments',
  authenticateUser,
  upload.array('files', 5),  
  uploadFileToTask           
);

// Invitaion Email




module.exports = router;
