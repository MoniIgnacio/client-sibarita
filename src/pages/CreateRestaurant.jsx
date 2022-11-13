import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurantService } from "../services/restaurant.services";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateRestaurant() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState("");
  const [cuisinType, setCuisinType] = useState("spanish");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handlePhotoChange = (e) => setPhotos(e.target.files[0]);
  const handleCuisinTypeChange = (e) => setCuisinType(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newRestaurant = {
      name: name,
      location: location,
      photos: photos,
      cuisinType: cuisinType,
      phoneNumber: phoneNumber,
    };
    console.log(newRestaurant)
    try {
      await createRestaurantService(newRestaurant);

      navigate("/login");
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
    <div style={{padding: '50px'}}>
      <h1>Da de alta tu restaurante</h1>

      <Form onSubmit={handleSignup}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Nombre del restaurante:{" "}
            </Form.Label>
            <Form.Control
              id="disabledTextInput"
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Dirección del restaurante:{" "}
            </Form.Label>
            <Form.Control
              id="disabledTextInput"
              type="text"
              name="location"
              value={location}
              onChange={handleLocationChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">
              Tipo de cocina de tu restaurante
            </Form.Label>
            <Form.Select
              id="disabledSelect"
              name="cuisinType"
              onChange={handleCuisinTypeChange}
              value={cuisinType}
            >
              <option value={"spanish"}>Española</option>
              <option value={"italian"}>Italiana</option>
              <option value={"japanese"}>Japonesa</option>
              <option value={"chinese"}>China</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Nº de teléfono del restaurante:
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
              Fotos de tu restaurante
            </Form.Label>
            <Form.Control
              id="disabledTextInput"
              type="file"
              name="photo"
              onChange={handlePhotoChange}
            />
          </Form.Group>

          {errorMessage !== "" && <p>{errorMessage}</p>}
          <Button type="submit">¡Añade tu restaurante!</Button>
        </fieldset>
      </Form>
    </div>
  );
}

export default CreateRestaurant;
