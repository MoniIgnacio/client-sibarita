import {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from "../context/auth.context"
import { Button } from 'react-bootstrap'
import LoginModal from './LoginModal'


function Navbar() {

  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn,user } = useContext(AuthContext)
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()
  }
  
  return (
    <div style={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '50px'}}>
      <LoginModal/>
      <Link to={'/'}>Home</Link>
      {isLoggedIn === true && <Link to={`/user/${user.user._id}`}>Perfil</Link>}
      
      <Link to={'/signup'}>Regístrate</Link>
      <Link to={"/restaurant/create"}>Crear Restaurant</Link>
      <Link to={"/restaurant/"}>All restaurants</Link>
      <Button onClick={handleLogout} variant="secondary">Cerrar Sesión</Button>
    </div>
  )
}

export default Navbar