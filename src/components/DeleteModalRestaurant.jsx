import React from "react";
import { useState } from "react";
import { deleteRestaurantService } from "../services/restaurant.services";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModalRestaurant() {
  const navigate = useNavigate();
  const { restId } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteRestaurantService(restId);

      navigate("/home");
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Elimina tu restaurante
      </Button>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar tu restaurante</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que quieres borrar tu restaurante?</Modal.Body>
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

export default DeleteModalRestaurant;
