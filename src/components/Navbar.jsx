import {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from "../context/auth.context"
import { Button } from 'react-bootstrap'

import ReservaModal from './ReservaModal'
import LoginModal from './LoginModal'


function Navbar() {

  const { authenticaUser, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext)
console.log(isLoggedIn)
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticaUser()
  }
  
  return (
    <div style={{backgroundColor: 'lightblue', display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '50px'}}>
      <LoginModal/>
      <ReservaModal/>
      <Link to={'/'}>Home</Link>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={"/restaurant/create"}>Crear Restaurant</Link>
      <Link to={"/restaurant/"}>All restaurants</Link>
      <Button onClick={handleLogout} variant="secondary">Cerrar Sesión</Button>
    </div>
  )
}

export default Navbar