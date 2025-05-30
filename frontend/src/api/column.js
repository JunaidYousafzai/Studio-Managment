import API from './axios';

export const createColumn = (boardId, data) => API.post(`auth/board/${boardId}/columns`, data);
export const getBoardColumns = (boardId) => API.get(`/auth/board/${boardId}/columns`);
export const updateColumn = (columnId, data) => API.put(`auth/board/columns/${columnId}`, data);
export const deleteColumn = (columnId) => API.delete(`/auth/board/columns/${columnId}`);








// http://localhost:4000/auth/board/2/columns

// router.post("/:boardId/columns", authenticateUser, createColumn);
// router.get("/:boardId/columns", authenticateUser, getBoardColumns);
// router.put("/columns/:columnId", authenticateUser, updateColumn);
// router.delete("/columns/:columnId", authenticateUser, deleteColumn);
