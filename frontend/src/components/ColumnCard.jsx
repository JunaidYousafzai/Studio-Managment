import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { addTask, getTasksByColumn, editTask, deleteTask } from "../api/tasks";
import { updateColumn, deleteColumn } from "../api/column";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ColumnCard = ({ column, onColumnUpdated, onColumnDeleted }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isEditingColumn, setIsEditingColumn] = useState(false);
  const [columnName, setColumnName] = useState(column.name);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);


  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "todo",
    deadline: new Date(),
  });
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasksByColumn(column.id);
        setTasks(res.data.tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [column.id]);

  const handleAddTask = async () => {
    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await addTask(column.id, {
        ...taskData,
        deadline: taskData.deadline.toISOString().split("T")[0],
      });

      const res = await getTasksByColumn(column.id);
      setTasks(res.data.tasks);

      setTaskData({
        title: "",
        description: "",
        status: "todo",
        deadline: new Date(),
      });
      setIsAddingTask(false);
    } catch (err) {
      console.error("Failed to add task:", err);
      setError(err.response?.data?.message || "Failed to add task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTask = async (taskId, updatedData) => {
    try {
      await editTask(taskId, {
        ...updatedData,
        deadline: new Date(updatedData.deadline).toISOString().split("T")[0],
      });
      const res = await getTasksByColumn(column.id);
      setTasks(res.data.tasks);
      setEditingTask(null);
    } catch (err) {
      console.error("Failed to update task:", err);
      setError(err.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await deleteTask(taskId);
      const res = await getTasksByColumn(column.id);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleUpdateColumn = async () => {
    if (!columnName.trim()) {
      setError("Column name is required");
      return;
    }

    try {
      await updateColumn(column.id, { name: columnName });
      onColumnUpdated(column.id, { name: columnName });
      setIsEditingColumn(false);
    } catch (err) {
      console.error("Failed to update column:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to update column");
    }
  };

const handleDeleteColumn = async () => {
  
  try {
  
    await deleteColumn(column.id);

  
    onColumnDeleted(column.id);
  } catch (err) {
  
    if (err.response?.status === 404) {
      console.warn("Column already deleted on server");
      onColumnDeleted(column.id); // update UI anyway
    } else {
      console.error("Failed to delete column:", err);
      setError(err.response?.data?.message || "Failed to delete column");
    }
  }
};



  return (
    <motion.div
      layout
      className="min-w-[280px] w-[280px] bg-gray-800 rounded-lg p-3 mx-2 flex flex-col"
      style={{ alignSelf: 'flex-start' }}
    >
      <div className="flex justify-between items-center mb-3">
        {isEditingColumn ? (
          <input
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            className="flex-1 p-1 bg-gray-700 text-white rounded"
            autoFocus
          />
        ) : (
          <h3 className="font-semibold text-white">{column.name}</h3>
        )}
        
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
            {tasks.length} tasks
          </span>
          
          {isEditingColumn ? (
            <>
              <button
                onClick={handleUpdateColumn}
                className="text-green-400 hover:text-green-300"
                title="Save"
              >
                <FaCheck size={14} />
              </button>
              <button
                onClick={() => setIsEditingColumn(false)}
                className="text-red-400 hover:text-red-300"
                title="Cancel"
              >
                <FaTimes size={14} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditingColumn(true)}
                className="text-blue-400 hover:text-blue-300"
                title="Edit Column"
              >
                <FaEdit size={14} />
              </button>
              <button
                onClick={handleDeleteColumn}
                className="text-red-400 hover:text-red-300"
                title="Delete Column"
              >
                <FaTrash size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2" style={{ minHeight: '40px' }}>
        {tasks.map((task) => (
          <div
            key={task.taskId}
            className="bg-gray-700 text-white p-3 rounded-lg space-y-1 relative group"
          >
            {editingTask === task.taskId ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={taskData.title}
                  onChange={(e) => setTaskData({...taskData, title: e.target.value})}
                  className="w-full p-1 bg-gray-600 text-white rounded"
                />
                <textarea
                  value={taskData.description}
                  onChange={(e) => setTaskData({...taskData, description: e.target.value})}
                  className="w-full p-1 bg-gray-600 text-white rounded"
                />
                <DatePicker
                  selected={new Date(taskData.deadline)}
                  onChange={(date) => setTaskData({...taskData, deadline: date})}
                  className="w-full p-1 bg-gray-600 text-white rounded"
                  dateFormat="yyyy-MM-dd"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingTask(null)}
                    className="px-2 py-1 text-xs text-gray-300 hover:bg-gray-600 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleEditTask(task.taskId, taskData)}
                    className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <h4 className="font-semibold">{task.title}</h4>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        setEditingTask(task.taskId);
                        setTaskData({
                          title: task.title,
                          description: task.description || "",
                          status: task.status,
                          deadline: new Date(task.deadline)
                        });
                      }}
                      className="text-blue-400 hover:text-blue-300"
                      title="Edit Task"
                    >
                      <FaEdit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.taskId)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete Task"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
                {task.description && (
                  <p className="text-sm text-gray-300">{task.description}</p>
                )}
                <p className="text-xs text-gray-400">
                  Due: {task.deadline.split("T")[0]} | Status: {task.status}
                </p>
              </>
            )}
          </div>
        ))}

        {isAddingTask ? (
          <div className="bg-gray-700 p-3 rounded-lg space-y-2">
            <input
              type="text"
              placeholder="Task title*"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              className="w-full p-2 bg-gray-600 text-white rounded"
              required
              autoFocus
            />
            <textarea
              placeholder="Description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              className="w-full p-2 bg-gray-600 text-white rounded"
            />
            <select
              value={taskData.status}
              onChange={(e) =>
                setTaskData({ ...taskData, status: e.target.value })
              }
              className="w-full p-2 bg-gray-600 text-white rounded"
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <DatePicker
              selected={taskData.deadline}
              onChange={(date) => setTaskData({ ...taskData, deadline: date })}
              minDate={new Date()}
              className="w-full p-2 bg-gray-600 text-white rounded"
              dateFormat="yyyy-MM-dd"
            />
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAddingTask(false)}
                className="px-3 py-1 text-sm text-gray-300 hover:bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                disabled={isLoading}
                className={`px-3 py-1 text-sm text-white rounded ${
                  isLoading ? "bg-blue-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="flex items-center justify-center w-full py-2 text-sm text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaPlus className="mr-2" />
            Add task
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ColumnCard;