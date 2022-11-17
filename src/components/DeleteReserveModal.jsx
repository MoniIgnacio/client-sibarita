import { useState} from "react";
import { deleteReservaService } from "../services/reserva.services";
import { useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteReserveModal({ reservationId, parentReservation }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
//handles the modal to show or hide
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//handles the elimination of a reserve, and through the passed function via props to get the data, once you delete it you dont have to refresh, autoupdates on the view
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteReservaService(reservationId);
      parentReservation();
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
            <Modal.Title>Eliminar la reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que quieres borrar tu reserva?</Modal.Body>
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

export default DeleteReserveModal;
