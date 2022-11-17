import service from "./config.services";
//routes from the backend to do exactly what their name says

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

const editRestaurantService = (updateRestaurant,restId) => {
  return service.patch(`/restaurant/${restId}/edit`, updateRestaurant);
};

const createReservaService = ( newReserve,restId) => {
  return service.post(`/restaurant/${restId}/reserva`, newReserve);
};

const createDishService = ( newDish, restId) => {
  return service.post(`/restaurant/${restId}/dish`, newDish);
};

const getAllDishesService = (restId) => {
  return service.get(`/restaurant/${restId}/alldishes`);
};

export {
  getAllRestaurantsService,
  createRestaurantService,
  getRestaurantService,
  deleteRestaurantService,
  editRestaurantService,
  createReservaService,
  createDishService,
  getAllDishesService
};
