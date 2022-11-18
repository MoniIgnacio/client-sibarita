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
    navigate("/");
  };

  return (
    <div
      style={{
        background: "#3586ff",
      }}
    >
      <div>
        <ul className="menu">
          <li className="menu__item">
            {/* All this cortocircuit or conditionals are used to track if there is a user logged in, or tracks the role of the user in order to show or hide a button */}
            <Link to={"/"} className="menu__link">
              Home
            </Link>
          </li>
          <li className="menu__item">
            {isLoggedIn === true && (
              <Link to={`/user/${user.user._id}`} className="menu__link">
                Perfil
              </Link>
            )}
          </li>
          <li className="menu__item">
            {isLoggedIn === true && user.user.role === "owner" && (
              <Link to={"/restaurant/create"} className="menu__link">
                Crear Restaurante
              </Link>
            )}
          </li>

          <li className="menu__item">
            {isLoggedIn === false && (
              <Link to={"/signup"} className="menu__link">
                Regístrate
              </Link>
            )}
          </li>
          <li className="menu__item">
            <Link to={"/restaurant/"} className="menu__link">
              Restaurantes
            </Link>
          </li>
          <li className="menu__item">
            {" "}
            {isLoggedIn === true ? (
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="menu__link"
              >
                Cerrar Sesión
              </Button>
            ) : (
              <LoginModal />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
