import React from 'react'
import { NavLink } from 'react-bootstrap'

function Navbar() {
  return (
    <div>
    <NavLink to={'/'}>Home</NavLink>
    <NavLink to={'/sirgnup'}>Sing Up</NavLink>    
    </div>
  )
}

export default Navbar