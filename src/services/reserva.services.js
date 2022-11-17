import service from "./config.services";
//routes from the backend to do exactly what their name says

const getAllReservasService = () => {
  return service.get("/reserva/");
};

const getReservaService = (userId) => {
  return service.get(`/user/${userId}/reserve`);
};

const deleteReservaService = (reservaId) => {
  return service.delete(`/reserva/${reservaId}`);
};

const editReservaService = (updateReserve, reservaId) => {
  return service.patch(`/reserva/${reservaId}`, updateReserve);
};

const newCommentService = (reservaId) => {
  return service.post(`/reserva/${reservaId}/comment`);
};
export {
  getAllReservasService,
  getReservaService,
  deleteReservaService,
  editReservaService,
  newCommentService,
};
