import API from './axios';

export const getProfile = () => API.get('/auth/user/profile');
export const editProfile = (data) => API.put('/auth/user/profile', data);



//  Profile
// router.get("/profile", authenticateUser, getProfile);
// router.put("/profile", authenticateUser, editProfile);