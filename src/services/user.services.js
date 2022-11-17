import service from "./config.services";
//routes from the backend to do exactly what their name says

const getUserService = (userId) => {
  return service.get(`/user/${userId}`);
};

const deleteUserService = (userId) => {
  return service.delete(`/user/${userId}`);
};

const editUserService = (updateUser,userId) => {
  return service.patch(`/user/${userId}`, updateUser);
};


export {
    getUserService,
    deleteUserService,
    editUserService
};
