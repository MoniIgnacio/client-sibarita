import React from "react";
import { useEffect, useState } from "react";
import { getUserService, editUserService } from "../services/user.services";
import { getReservaService, editReservaService } from "../services/reserva.services";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from 'react-bootstrap/Table';
import DeleteUserModal from "../components/DeleteUserModal";

function ClientProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [reservations, setReservations] = useState("")
  const [isFetching, setIsFetching] = useState(true);


  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      const response = await getUserService(userId);
      const { data } = response;
      setUsername(data.username);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
    } catch (error) {
      navigate("/error");
    }
  };


  const getReservationList = async () => {
    try {
      let response = await getReservaService(userId)
      setReservations(response.data)
      setIsFetching(false)

    } catch (error) {
      navigate("/error")
    }
  }
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const updateUser = {
        username: username,
        phoneNumber: phoneNumber,
        email: email,
      };

      await editUserService(updateUser, userId);
      handleClose()
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <h1>Nombre de usuario: {username}</h1>
      <h4>Número de telefono: {phoneNumber}</h4>
      <h4>Dirección de correo:{email}</h4>
      <Button variant="primary" onClick={handleShow}>
        Editar perfil
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form onSubmit={handleEdit}>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Nombre usuario:{" "}
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Número de teléfono:{" "}
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  E-mail:
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
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
          <DeleteUserModal/>
        </Modal.Footer>
      </Modal>

      <div style={{width: "30vw", marginLeft: "20px"}}>
      <Table striped>
      <thead>
        <tr>
          <th>Restaurante</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Pax</th>
        </tr>
      </thead>
      {reservations.map((eachReservation) => {
        return ( 
          <tbody>
        <tr>
          <td>{eachReservation.restaurant}</td>
          <td>{eachReservation.fecha}</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>)
      })}
     
    </Table>
      </div>
    </div>
  );
}

export default ClientProfile;
