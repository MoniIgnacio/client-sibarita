import {useContext} from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'
import {AuthContext} from "../components/context/auth.context"
import { Button } from 'react-bootstrap'
import ReservaModal from './ReservaModal'


function Navbar() {

  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext)


  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()
  }
  
  return (
    <div style={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '50px'}}>
      <LoginModal/>
      <ReservaModal/>
      <Link to={'/'}>Home</Link>
      <Link to={'/signup'}>Crea una cuenta</Link>
      <Link to={"/restaurant/create"}>Añade tu restaurante</Link>
      <Button onClick={handleLogout} variant="secondary">Cerrar Sesión</Button>
    </div>
  )
}

export default Navbar