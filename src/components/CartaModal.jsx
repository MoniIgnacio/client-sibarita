import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDishService } from "../services/restaurant.services";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Cartamodal(props) {
  const navigate = useNavigate();
  const { restId } = useParams();
//nned this states to be able to create a dish
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("principal");

  // modal states!
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [errorMessage, setErrorMessage] = useState("");
 //targets what you place in an input through the events and the functions to change the states
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
//handles the creation of a dish, sets the values for the modal to 0 so when
//you reopen it does not keep the values of an older dish added
//renews the information through the prop function that gets the data stored in the modal
  const handleDish = async (e) => {
    e.preventDefault();

    const newDish = {
      title,
      description,
      price,
      category,
    };

    try {
      await createDishService(newDish, restId);
      props.actualizarPage();
      setTitle('');
      setDescription('');
      setPrice(0)
      handleClose();
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
    <div>
      <div>
        <>
          <Button variant="primary" onClick={handleShow}>
            Create a Dish
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a Dish</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <Form onSubmit={handleDish}>
                <fieldset>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">
                      Nombre del plato:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleTitleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">
                      Descripción del plato:
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledTextInput">Precio:</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="disabledSelect">
                      Categoría del plato:
                    </Form.Label>
                    <Form.Select
                      name="category"
                      onChange={handleCategoryChange}
                      value={category}
                    >
                      <option value={"entrante"}>Entrante</option>
                      <option value={"principal"}>Principal</option>
                      <option value={"postre"}>Postre</option>
                    </Form.Select>
                  </Form.Group>

                  {errorMessage !== "" && <p>{errorMessage}</p>}
                </fieldset>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" onClick={handleDish}>
                Añade tu plato
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Cartamodal;
