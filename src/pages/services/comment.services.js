import service from "./config.services";

const getAllCommentsService = () => {
  return service.get("/comment/");
};

const getCommentService = (commentId) => {
  return service.get(`/comment/${commentId}`);
};

const deleteCommentService = (commentId) => {
  return service.delete(`/comment/${commentId}`);
};

const editCommentService = (commentId) => {
  return service.patch(`/comment/${commentId}`);
};

export {
  getAllCommentsService,
  getCommentService,
  deleteCommentService,
  editCommentService,
};
