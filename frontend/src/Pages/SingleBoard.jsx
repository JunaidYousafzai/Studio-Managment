import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import {
  getBoardColumns,
  createColumn
} from '../api/column';

import {getTasksByColumn,addTask} from "../api/tasks"

const SingleBoardPage = () => {
  const { boardId } = useParams();
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');

  useEffect(() => {
    const fetchColumns = async () => {
      const cols = await getBoardColumns(boardId);
      const colsWithTasks = await Promise.all(
        cols.data.map(async (col) => {
          const tasks = await getTasksByColumn(col.id);
          return { ...col, tasks: tasks.data };
        })
      );
      setColumns(colsWithTasks);
    };
    fetchColumns();
  }, [boardId]);

  const handleCreateColumn = async () => {
    await createColumn(boardId, { name: newColumnName });
    setNewColumnName('');
    // Re-fetch columns
    const cols = await getBoardColumns(boardId);
    setColumns(cols.data);
  };

  return (
    <div>
      <h1>Board Details</h1>
      <input
        type="text"
        value={newColumnName}
        onChange={(e) => setNewColumnName(e.target.value)}
        placeholder="New Column Name"
      />
      <button onClick={handleCreateColumn}>Add Column</button>
      <div style={{ display: 'flex', gap: '20px' }}>
        {columns.map((column) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ border: '1px solid #ccc', padding: '10px' }}
          >
            <h2>{column.name}</h2>
            {column.tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p>{task.title}</p>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SingleBoardPage;
