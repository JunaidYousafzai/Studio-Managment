import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { getSingleTask, editTask } from '../api/tasks';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    getSingleTask(id).then((res) => setTask(res.data));
  }, [id]);

  const handleEditTask = async () => {
    await editTask(id, task);
    // Optionally, show a success message
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1>Task Details</h1>
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
      />
      <button onClick={handleEditTask}>Save Changes</button>
    </motion.div>
  );
};

export default TaskDetailsPage;
