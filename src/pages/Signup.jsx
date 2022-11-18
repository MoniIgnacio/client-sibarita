import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";

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
//tracks the changes being made in the input fields to change the states
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleRoleChange = (e) => setRole(e.target.value);
//handles the creation of an account and redirects you to the view of all the restaurants so you can get started!
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

      navigate("/restaurant");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div style={{ padding: "15vh", color: 'white', textShadow:'2px 3px black'}}>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSignup}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Nombre de usuario
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">E-mail:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Nº de teléfono:</Form.Label>
            <Form.Control
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">Contraseña: </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledTextInput">
              Confirmar contraseña:{" "}
            </Form.Label>
            <Form.Control
              type="password"
              name="password2"
              value={password2}
              onChange={handlePassword2Change}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              style={{ display: "flex", justifyContent: "center", gap: "30px" }}
              type="checkbox"
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
