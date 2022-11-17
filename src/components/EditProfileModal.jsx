import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DeleteUserModal from "../components/DeleteUserModal";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { editUserService } from "../services/user.services";

function EditProfileModal({
  getDataUser,
  parentGetUserDetails,
}) {
  const navigate = useNavigate();

  const { userId } = useParams();
  const [username, setUsername] = useState(parentGetUserDetails[0]);
  const [phoneNumber, setPhoneNumber] = useState(parentGetUserDetails[1]);
  const [email, setEmail] = useState(parentGetUserDetails[2]);
  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    setUsername(parentGetUserDetails[0]);
    setPhoneNumber(parentGetUserDetails[1]);
    setEmail(parentGetUserDetails[2]);
  }, [parentGetUserDetails[0]]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
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
      handleClose();
      getDataUser()
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
                <Form.Label htmlFor="disabledTextInput">E-mail:</Form.Label>
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
          <DeleteUserModal />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProfileModal;
