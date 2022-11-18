import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  editRestaurantService,
  getRestaurantService,
} from "../services/restaurant.services";
import DeleteModalRestaurant from "../components/DeleteModalRestaurant";
import { Button, Modal, Form } from "react-bootstrap";

import { uploadImage } from "../services/upload.services";

function RestaurantEdit(props) {
  const navigate = useNavigate();
  const { restId } = useParams();

  const [nameInput, setNameInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cuisinTypeInput, setCuisinTypeInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [isUploadingImage, setIsUploadinImage] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // modal states!
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getData();
  }, []);
  //gets all the data for the restaurant, shows on the input fields the current information just in case you just want to change one field
  const getData = async () => {
    try {
      const response = await getRestaurantService(restId);
      setNameInput(response.data.name);
      setLocationInput(response.data.location);
      setImageUrl(response.data.photos);
      setCuisinTypeInput(response.data.cuisinType);
      setPhoneNumberInput(response.data.phoneNumber);
    } catch (error) {
      navigate("/error");
    }
  };
//keeps an eye of what you place in the input fields to change the state
  const handleNameChange = (e) => setNameInput(e.target.value);
  const handleLocationChange = (e) => setLocationInput(e.target.value);
  const handleCuisinTypeChange = (e) => setCuisinTypeInput(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumberInput(e.target.value);
//handles the edition of the restaurant information, closes the modal and autoupdates the information so you dont have to refresh manually
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const updateRestaurant = {
        name: nameInput,
        location: locationInput,
        photos: imageUrl,
        cuisinType: cuisinTypeInput,
        phoneNumber: phoneNumberInput,
      };

      await editRestaurantService(updateRestaurant, restId);
      handleClose();
      props.getRestaurant();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
 //Handles changing the photo of your restaurant (most likely we will need to make some changes to this when you can upload more than one)
  const handlePhotoChange = async (event) => {
    setIsUploadinImage(true);

    const sendObj = new FormData();
    sendObj.append("photo", event.target.files[0]);
    try {
      const response = await uploadImage(sendObj);
      setImageUrl(response.data.img);
      setIsUploadinImage(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          Edit Information
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form onSubmit={handleEdit}>
              <fieldset>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">
                    Nombre del restaurante:{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={nameInput}
                    onChange={handleNameChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">
                    Dirección del restaurante:{" "}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={locationInput}
                    onChange={handleLocationChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledSelect">
                    Tipo de cocina de tu restaurante
                  </Form.Label>
                  <Form.Select
                    name="cuisinType"
                    onChange={handleCuisinTypeChange}
                    value={cuisinTypeInput}
                  >
                    <option value={"Italiana"}>Italiana</option>
                    <option value={"Española"}>Española</option>
                    <option value={"Japonesa"}>Japonesa</option>
                    <option value={"China"}>China</option>
                    <option value={"Americana"}>Americana</option>
                    <option value={"Tailandesa"}>Tailandesa</option>
                    <option value={"Fusión"}>Fusión</option>
                    <option value={"Griega"}>Griega</option>
                    <option value={"Marroquí"}>Marroquí</option>
                    <option value={"Turca"}>Turca</option>
                    <option value={"India"}>India</option>
                    <option value={"Parrilla"}>Parrilla</option>
                    <option value={"Vegetariana"}>Vegetariana</option>
                    <option value={"Vegana"}>Vegana</option>
                    <option value={"Pesquetariana"}>Pesquetariana</option>
                    <option value={"Asiática"}>Asiática</option>
                    <option value={"Mexicana"}>Mexicana</option>
                    <option value={"Argentina"}>Argentina</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">
                    Nº de teléfono del restaurante:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={phoneNumberInput}
                    onChange={handlePhoneNumberChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="disabledTextInput">
                    Fotos de tu restaurante
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    onChange={handlePhotoChange}
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
             {/* Makes sure that you have uploaded an image for your restaurant in order to make usable the button to create the restaurant */}
          {isUploadingImage === true ? (
            <Button disabled={true} onClick={handleEdit}>
              Editar
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEdit}>
              Editar
            </Button>
          )}
            <DeleteModalRestaurant />
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default RestaurantEdit;
