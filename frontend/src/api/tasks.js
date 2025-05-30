import API from './axios';

export const allTasks = () => API.get('/tasks');
export const addTask = (columnId, data) => API.post(`/auth/user/columns/${columnId}/tasks`, data);
export const getSingleTask = (id) => API.get(`/tasks/${id}`);
export const getTasksByColumn = (columnId) => API.get(`/auth/user/columns/${columnId}/tasks`);
export const editTask = (id, data) => API.put(`/auth/user/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/auth/user/tasks/${id}`);
