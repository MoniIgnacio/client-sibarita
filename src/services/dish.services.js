import service from "./config.services";

const getDishService = (restaurantId) => {
  return service.get(`/dish/${restaurantId}`);
};

const deleteDishService = (restaurantId) => {
  return service.delete(`/dish/${restaurantId}`);
};

const editDishService = (restaurantId) => {
  return service.patch(`/dish/${restaurantId}`);
};

export { 
    getDishService,
    deleteDishService,
    editDishService
 };
