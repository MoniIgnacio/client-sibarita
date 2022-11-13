import service from "./config.services";

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
    editDishService
 };
