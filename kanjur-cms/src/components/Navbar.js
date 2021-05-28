import React from 'react'
import {
  Link
} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-md">
        <Link to="/" className="btn navbar-brand">Home</Link>
        
        <Link to="/login" className="btn navbar-brand">Logout</Link>
      </div>
    </nav>
  )
}

export default Navbar
