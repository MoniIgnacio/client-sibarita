import service from "./config.services";

const getAllRestaurantsService = () => {
  return service.get("/restaurant/");
};

const createRestaurantService = (newUser) => {
  return service.post("/restaurant/create", newUser);
};

const getRestaurantService = (restId) => {
  return service.get(`/restaurant/${restId}`);
};

const deleteRestaurantService = (restId) => {
  return service.delete(`/restaurant/${restId}`);
};

const editRestaurantService = (restId) => {
  return service.patch(`/restaurant/${restId}`);
};

const createReservaService = (restId) => {
  return service.post(`/restaurant/${restId}/reserva`);
};

const createDishService = (restId) => {
  return service.post(`/restaurant/${restId}/dish`);
};

export {
  getAllRestaurantsService,
  createRestaurantService,
  getRestaurantService,
  deleteRestaurantService,
  editRestaurantService,
  createReservaService,
  createDishService
};
