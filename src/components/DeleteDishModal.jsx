import React from "react";
import { useState } from "react";
import { deleteDishService } from "../services/dish.services";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteDishModal({ parentGetList, parentListId }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
//handles showing or hiding the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//handles the function to delete a dish, and through the passed prop of the function to get the data renews it on the view without needing to refresh
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteDishService(parentListId);
      parentGetList();
      handleClose();
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Eliminar
      </Button>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar </Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que quieres borrar este plato?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Sí
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default DeleteDishModal;
