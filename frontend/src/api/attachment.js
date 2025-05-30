import API from './axios';

export const uploadAttachments = (taskId, files) => {
  const formData = new FormData();
  for (let file of files) {
    formData.append('files', file);
  }

  return API.post(`/tasks/${taskId}/attachments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



// router.post(
//   '/tasks/:taskId/attachments',
//   authenticateUser,
//   upload.array('files', 5),  
//   uploadFileToTask           
// );