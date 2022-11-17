import {useContext} from "react";
import { useState } from "react";
import { deleteUserService } from "../services/user.services";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../context/auth.context";

function DeleteUserModal() {
  const {authenticaUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const { userId } = useParams();
  const [show, setShow] = useState(false);
 //handles the modal to show or hide
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //makes sure that the token is deleted once you delete the account
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()
  }
//deletes the user accounts, removes the existing token for that account and sends you back home
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUserService(userId);
      handleLogout()
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        Elimina tu perfil
      </Button>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar tu perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que quieres borrar tu perfil?</Modal.Body>
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

export default DeleteUserModal;
