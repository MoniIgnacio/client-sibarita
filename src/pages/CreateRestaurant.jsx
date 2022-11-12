import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../pages/services/auth.services";

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
  const handlePhotoChange = (e) => setPhotos(e.target.value);
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

    try {
      // await signupService(newRestaurant);

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
    <div>
      <h1>Da de alta tu restaurante</h1>

      <form onSubmit={handleSignup}>
        <label>Nombre del restaurante:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <label>Dirección del restaurante:</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={handleLocationChange}
        />

        <label>Agrega fotos de tu restaurante</label>
        <input type="text" />

        <label>Agrega los tipos de cocina de tu restaurante</label>
        <select
          name="cuisinType"
          onChange={handleCuisinTypeChange}
          value={cuisinType}
        >
          <option value={"spanish"}>Española</option>
          <option value={"italian"}>Italiana</option>
          <option value={"japanese"}>Japonesa</option>
          <option value={"chinese"}>China</option>
        </select>

        <label>Nº de teléfono del restaurante</label>
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <button type="submit">¡Añade tu restaurante!</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default CreateRestaurant;
