import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
    <Link to={'/'}>Home</Link>
    <Link to={'/signup'}>Sign Up</Link>
    <Link to={"/restaurant/create"}>Da de alta tu restaurante</Link>
    </div>
  )
}

export default Navbar