const db = require("../config/db")
const express = require("express")


const allTasks = async (request, response) => {
  const userId = request.user.id;
  try {
    const [tasks] = await db.query(
      `SELECT 
          tasks.id AS taskId,
          tasks.title, 
          tasks.description,
          tasks.status,
          tasks.deadline,
          tasks.column_id,
          tasks.assigned_to_user_id
       FROM tasks
       WHERE tasks.user_id = ?`,
      [userId]
    );

    response.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    response.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

const getTasksByColumn = async (request, response) => {
  const userId = request.user.id;
  const { columnId } = request.params;

  try {
    const [tasks] = await db.query(
      `SELECT 
         id AS taskId,
         title, 
         description,
         status,
         deadline
       FROM tasks
       WHERE user_id = ? AND column_id = ?`,
      [userId, columnId]
    );

    response.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks by column:", error);
    response.status(500).json({ message: "Failed to fetch tasks by column", error: error.message });
  }
};


const addClient = async (request, response) => {
  const { clientName } = request.body;
  const userId = request.user.id;

  try {
    const [result] = await db.query(
      `INSERT INTO clients (user_id, client_name) VALUES (?, ?)`,
      [userId, clientName]
    );

    if (result.affectedRows > 0) {
      response.status(201).json({ message: "Client added successfully!" });
    } else {
      throw new Error("No rows affected");
    }
  } catch (error) {
    console.error("Error while adding client:", error);
    response.status(500).json({ message: "Failed to add client", error: error.message });
  }
}


const addTasks = async (request, response) => {
  let { title, description, status, deadline } = request.body;
  const userId = request.user.id; 
  const { columnId } = request.params; 


  if (!columnId || !title || !status) {
    return response.status(400).json({ message: "Column ID, title, and status are required!" });
  }

  try {

    const [columns] = await db.query(
      `SELECT * FROM columns WHERE id = ?`,
      [columnId]
    );

    if (columns.length === 0) {
      return response.status(404).json({ message: "Column not found!" });
    }


    await db.query(
      `INSERT INTO tasks (user_id, column_id, title, description, status, deadline) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, columnId, title, description || null, status, deadline]
    );

    return response.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("add Task Error:", error);
    return response.status(500).json({ message: "Failed to add task", error: error.message });
  }
};




const getSingleTask = async (request, response) => {
  const taskId = request.params.id;
  const userId = request.user.id;

  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (tasks.length === 0) {
      return response.status(404).json({ message: "Task not found or unauthorized" });
    }

    response.status(200).json({ task: tasks[0] });
  } catch (error) {
    console.error("Get single task error:", error);
    response.status(500).json({ message: "Failed to fetch task", error: error.message });
  }
};





const editTask = async (request, response) => {
  const taskId = request.params.id;
  const userId = request.user.id;
  const { title, description, status, deadline } = request.body;

  if (!title || !status) {
    return response.status(400).json({ message: "Title and status are required to update task" });
  }

  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (tasks.length === 0) {
      return response.status(403).json({ message: "Unauthorized to edit this task" });
    }

    await db.query(
      `UPDATE tasks 
         SET title = ?, description = ?, status = ?, deadline = ? 
         WHERE id = ? AND user_id = ?`,
      [title, description || null, status, deadline || null, taskId, userId]
    );

    response.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Edit task error:", error);
    response.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

const deleteTask = async (request, response) => {
  const taskId = request.params.id;
  const userId = request.user.id;

  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (tasks.length === 0) {
      return response.status(403).json({ message: "Unauthorized to delete this task" });
    }

    await db.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    response.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    response.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

const uploadFileToTask = async (request, response) => {
  const taskId = request.params.taskId;
  const userId = request.user.id;
  const files = request.files;

  if (!files || files.length === 0) {
    return response.status(400).json({ message: "No files uploaded" });
  }

  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
      [taskId, userId]
    );

    if (tasks.length === 0) {
      return response.status(403).json({ message: "Unauthorized to add files to this task" });
    }

    for (const file of files) {
      const fileUrl = "/uploads/" + file.filename;
      await db.query(
        "INSERT INTO task_attachments (task_id, file_url, uploaded_by) VALUES (?, ?, ?)",
        [taskId, fileUrl, userId]
      );
    }

    response.status(201).json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error("File upload error:", error);
    response.status(500).json({ message: "Failed to upload files", error: error.message });
  }
};



module.exports = {
  allTasks,
  getTasksByColumn,
  addTasks,
  editTask,
  deleteTask,
  uploadFileToTask,
  getSingleTask
}