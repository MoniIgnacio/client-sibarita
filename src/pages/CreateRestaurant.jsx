import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurantService } from "../services/restaurant.services";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uploadImage } from "../services/upload.services";

function CreateRestaurant() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cuisinType, setCuisinType] = useState("Española");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isUploadingImage, setIsUploadinImage] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
//handles all of the changes (additions) in the input fields for the creation of the restaurant
  const handleNameChange = (e) => setName(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleCuisinTypeChange = (e) => setCuisinType(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
//handles the creation of a restaurant
  const handleCreate = async (e) => {
    e.preventDefault();

    const newRestaurant = {
      name: name,
      location: location,
      photos: imageUrl,
      cuisinType: cuisinType,
      phoneNumber: phoneNumber,
    };

    try {
      await createRestaurantService(newRestaurant);
      navigate("/restaurant");
    } catch (error) {
      
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
//handles uploading an image through cloudinary for the restaurant, we hope to be able to upload more than 1 image since the carrousel works perfectly fine
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
    <div style={{ padding: "50px" }}>
      <h1>Da de alta tu restaurante</h1>

      <Form onSubmit={handleCreate}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Nombre del restaurante:{" "}
            </Form.Label>
            <Form.Control
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
              name="cuisinType"
              onChange={handleCuisinTypeChange}
              value={cuisinType}
            >
              {" "}
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
              type="number"
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
              type="file"
              name="photo"
              onChange={handlePhotoChange}
            />
          </Form.Group>
          {isUploadingImage === true && <p>... subiendo imagen</p>}

          {imageUrl !== "" && (
            <img src={imageUrl} alt="image" width={"250px"} />
          )}
          {errorMessage !== "" && <p>{errorMessage}</p>}
         {/* Makes sure that you have uploaded an image for your restaurant in order to make usable the button to create the restaurant */}
          {imageUrl === "" ? (
            <Button type="submit" disabled={true}>
              ¡Añade tu restaurante!
            </Button>
          ) : (
            <Button type="submit">¡Añade tu restaurante!</Button> 
          )}
        </fieldset>
      </Form>
    </div>
  );
}

export default CreateRestaurant;
