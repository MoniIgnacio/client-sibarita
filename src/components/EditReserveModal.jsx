import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editReservaService } from "../services/reserva.services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EditReserveModal({ parentInfo, parentId, parentReservation }) {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState();
  const [hour, setHour] = useState();
  const [pax, setPax] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);
  //gets the information that the reserve holds at the moment
  useEffect(() => {
    setFecha(parentInfo[0]);
    setHour(parentInfo[1]);
    setPax(parentInfo[2]);
  }, [parentInfo[0]]);

  const handleClose = () => setShow(false);
//handles the changes being made on the input fields and track what is being changed
  const handleShow = () => setShow(true);
  const handleFechaChange = (e) => setFecha(e.target.value);
  const handleHourChange = (e) => setHour(e.target.value);
  const handlePaxChange = (e) => setPax(e.target.value);
//handles the edition of a reserve, and autoupdates through the function to get the reservationdata via passed via props
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const updateReserve = {
        fecha: fecha,
        hour: hour,
        pax: pax,
      };
      await editReservaService(updateReserve, parentId);
      handleClose();
      parentReservation();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleEdit}>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">Fecha: </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="date"
                  name="fecha"
                  value={fecha}
                  onChange={handleFechaChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">Hora: </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="time"
                  name="hour"
                  value={hour}
                  onChange={handleHourChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">Pax:</Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="number"
                  name="pax"
                  value={pax}
                  onChange={handlePaxChange}
                />
              </Form.Group>
              {errorMessage !== "" && <p>{errorMessage}</p>}
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditReserveModal;
