import {useContext} from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'
import {AuthContext} from "../components/context/auth.context"


function Navbar() {

  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext)


  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()
  }
  return (
    <div>
    <LoginModal/>
    <Link to={'/'}>Home</Link>
    <Link to={'/signup'}>Sign Up</Link>
    <Link to={"/restaurant/create"}>Da de alta tu restaurante</Link>
    <button onClick={handleLogout}>Cerrar Sesión</button>

    </div>
  )
}

export default Navbar