import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { logout } from '../store/action/action'

function Navbar() {
  const dispatch = useDispatch()
  function handleLogoutButton(){
    localStorage.clear()
    dispatch(logout())
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-md">
        <Link to="/" className="btn navbar-brand">Home</Link>
        
        <button onClick={(e)=> {
          e.preventDefault()
          handleLogoutButton()
        }} className="btn navbar-brand">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
