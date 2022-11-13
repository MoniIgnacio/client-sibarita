import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../pages/services/auth.services";
import { AuthContext } from "./context/auth.context";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function LoginModal() {
  const { authenticaUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // modal states!
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: password,
    };

    try {
      const response = await loginService(userCredentials);
      localStorage.setItem("authToken", response.data.authToken);

      authenticaUser();

      navigate("/profile");
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
      <>
        <Button variant="primary" onClick={handleShow}>
          ¡Inicia Sesión!
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
                  <Form.Label htmlFor="disabledTextInput">E-mail:</Form.Label>
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
                    Contraseña:
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
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Acceder
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default LoginModal;
