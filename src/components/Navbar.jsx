import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button } from "react-bootstrap";
import LoginModal from "./LoginModal";

function Navbar() {
  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn, user } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticaUser();
    navigate('/')
    
  };

  return (
    <div
      style={{
        backgroundColor: "lightblue",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        height: "50px",
      }}
    >
      <Link to={"/"}>Home</Link>
      { isLoggedIn === true && <Link to={`/user/${user.user._id}`}>Perfil</Link>}
      
      {isLoggedIn === true ? (
        <Link to={"/restaurant/create"}>Crear Restaurant</Link>
      ) : (
        <Link to={"/signup"}>Regístrate</Link>
      )}

      <Link to={"/restaurant/"}>All restaurants</Link>

      {isLoggedIn === true ? (
        <Button onClick={handleLogout} variant="secondary">
          Cerrar Sesión
        </Button>
      ) : (
        <LoginModal />
      )}
    </div>
  );
}

export default Navbar;
