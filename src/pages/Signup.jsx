import { useState } from "react";
// import { signupService } from "../services/auth.services";
import { useNavigate } from "react-router-dom"

function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();


    const newUser = {
      email: email,
      password: password
    }

    try {
      
      // await signupService(newUser)

      navigate("/login")

    } catch (error) {
      // console.log(error.response.status)
      // console.log(error.response.data.errorMessage)
      if (error.response && error.response.status === 400) {
        // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // si el error es otro (500) entonces si redirecciono a /error
        navigate("/error")
      }
    }


  };

  return (
    <div>

      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit">Signup</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}

      </form>
      
    </div>
  );
}

export default Signup;