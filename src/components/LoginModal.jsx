import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { AuthContext } from "../context/auth.context";

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
      //!Cambiar navigate
      navigate("/profile");
    } catch (error) {
      // console.log(error.response.status)
      // console.log(error.response.data.errorMessage)
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
    <div>
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
  );
}

export default LoginModal;
