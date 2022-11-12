import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../pages/services/auth.services";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("client");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      username: username,
      password: password,
      password2: password2,
      role: role,
      phoneNumber: phoneNumber,
    };

    try {
      await signupService(newUser);

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
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <label>¿Tienes un restaurante?</label>
        <input
          type="checkbox"
          name="role"
          value={"owner"}
          onChange={handleRoleChange}
        />
        <label>Nombre de usuario</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <label>Nº de teléfono:</label>
        <input
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label>Confirmar contraseña:</label>
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={handlePassword2Change}
        />

        <button type="submit">Signup</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Signup;
