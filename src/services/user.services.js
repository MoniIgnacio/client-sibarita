import service from "./config.services";

const getUserService = (userId) => {
  return service.get(`/user/${userId}`);
};

const deleteUsertService = (userId) => {
  return service.delete(`/user/${userId}`);
};

const editUserService = (userId) => {
  return service.patch(`/user/${userId}`);
};


export {
    getUserService,
    deleteUsertService,
    editUserService
};
