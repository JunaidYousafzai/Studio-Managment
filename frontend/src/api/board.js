import API from './axios';

export const createBoard = (data) => API.post('/auth/board', data);
export const getBoards = () => API.get('/auth/board/');
export const addBoardMember = (boardId, data) => API.post(`/${boardId}/members`, data);
export const getBoardMembers = (boardId) => API.get(`/${boardId}/members`);
export const updateBoard = (boardId, data) => API.put(`/auth/board/${boardId}`,data)
export const deleteBoard = (boardId) => API.delete(`/auth/board/${boardId}`)



// router.post("/",authenticateUser,createBoard)
// router.post("/:boardId/members",authenticateUser,addBoardMember)
// router.get("/",authenticateUser,getUserBoards)
// router.get("/:boardId/members",authenticateUser,getBoardMembers)