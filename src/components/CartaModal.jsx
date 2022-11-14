import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCartaService } from "../services/restaurant.services";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Cartamodal() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("principal");

  // modal states!
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const newDish = {
      title,
      description,
      price,
      category,
    };
    console.log(newDish);

    try {
      await createCartaService(newDish);
      navigate("/profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error");
      }
    }
  };

  return (
  <div><div>
  <>
    <Button variant="primary" onClick={handleShow}>
     Inicia Sesion!
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Inicia Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Form onSubmit={handleLogin}>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">Email:</Form.Label>
              <Form.Control
                id="disabledTextInput"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">
                Contraseña:{" "}
              </Form.Label>
              <Form.Control
                id="disabledTextInput"
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
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
        <Button variant="primary" onClick={handleLogin}>
          Access
        </Button>
      </Modal.Footer>
    </Modal>
  </>
</div>
  </div>)
}

export default Cartamodal;
