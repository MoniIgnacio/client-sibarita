import {useContext} from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'
import {AuthContext} from "../components/context/auth.context"
import { Button } from 'react-bootstrap'


function Navbar() {

  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext)


  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()
  }
  
  return (
    <div style={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '50px'}}>
      <LoginModal/>
      <Link to={'/'}>Home</Link>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={"/restaurant/create"}>Crear Restaurant</Link>
      <Button onClick={handleLogout} variant="secondary">Cerrar Sesión</Button>
    </div>
  )
}

export default Navbar