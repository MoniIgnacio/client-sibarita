import service from "./config.services";

const getAllReservasService = () => {
  return service.get("/reserva/");
};

const getReservaService = (reservaId) => {
  return service.get(`/reserva/${reservaId}`);
};

const deleteReservaService = (reservaId) => {
  return service.delete(`/reserva/${reservaId}`);
};

const editReservaService = (reservaId) => {
  return service.patch(`/reserva/${reservaId}`);
};

const newCommentService = (reservaId) => {
    return service.post(`/reserva/${reservaId}/comment`);
  };
export {
  getAllReservasService,
  getReservaService,
  deleteReservaService,
  editReservaService,
  newCommentService
};
