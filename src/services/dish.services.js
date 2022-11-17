import service from "./config.services";
//routes from the backend to do exactly what their name says

const getDishService = (dishId) => {
  return service.get(`/dish/${dishId}`);
};

const deleteDishService = (dishId) => {
  return service.delete(`/dish/${dishId}`);
};

const editDishService = (dishId) => {
  return service.patch(`/dish/${dishId}`);
};

export {
  getDishService,
  deleteDishService,
  editDishService,
};
