import React from 'react'
import { Link } from 'react-router-dom'
import LoginModal from './LoginModal'

function Navbar() {
  return (
    <div>
    <LoginModal/>
    <Link to={'/'}>Home</Link>
    <Link to={'/signup'}>Sign Up</Link>
    <Link to={"/restaurant/create"}>Da de alta tu restaurante</Link>
    </div>
  )
}

export default Navbar