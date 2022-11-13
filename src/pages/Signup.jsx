import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../pages/services/auth.services";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
    <div style={{padding: '20vh'}}>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSignup}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Nombre de usuario</Form.Label>
            <Form.Control id="disabledTextInput" type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">E-mail:</Form.Label>
            <Form.Control id="disabledTextInput" type="email"
          name="email"
          value={email}
          onChange={handleEmailChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Nº de teléfono:</Form.Label>
            <Form.Control id="disabledTextInput" type="text"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Contraseña: </Form.Label>
            <Form.Control id="disabledTextInput" type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange} />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Confirmar contraseña: </Form.Label>
            <Form.Control id="disabledTextInput" type="password"
          name="password2"
          value={password2}
          onChange={handlePassword2Change} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="disabledFieldsetCheck"
              label="¿Tienes un restaurante?"
              name="role"
              value="owner"
              onChange={handleRoleChange}
            />
        {errorMessage !== "" && <p>{errorMessage}</p>}
          </Form.Group>
          <Button type="submit">Crear cuenta</Button>
        </fieldset>
      </Form>

      
    </div>
  );
}

export default Signup;
