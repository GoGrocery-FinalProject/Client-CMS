import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { logout } from '../store/action/ProductAction'
import logo from '../assets/logo.png'

function Navbar() {
  const dispatch = useDispatch()
  function handleLogoutButton(){
    localStorage.clear()
    dispatch(logout())
  }
  return (
    <div className="sidebar">
      <div className="section navbar-nav mx-auto">
        <div className="card" style={{marginTop:"3vh"}}>
          <img 
            style={{width:"100%", alignContent:"center", justifyContent:"center"}}
            alt="logo app"
            src={logo}>
          </img>
        </div>
        <hr></hr>
        <Link to="/"><div className="nav-item item btn" style={{width:"100%"}}><p style={{textAlign:"left"}}>Product List</p></div></Link>
        <Link to="/add"><div className="nav-item item btn" style={{width:"100%"}}><p style={{textAlign:"left"}}>Add new Product</p></div></Link>
        <Link to="/create-report"><div className="nav-item item btn" style={{width:"100%"}}><p style={{textAlign:"left"}}>Create Daily Report</p></div></Link>
        <Link to="/report"><div className="nav-item item btn" style={{width:"100%"}}><p style={{textAlign:"left"}}>Report</p></div></Link>
        <Link to="/transaction/ORDER"><div className="nav-item item btn" style={{width:"100%"}}><p style={{textAlign:"left"}}>Transaction</p></div></Link>
      </div>
        <div className="section navbar-nav mx-auto">
          <button className="nav-item item btn" onClick={(e) => {
            e.preventDefault()
            handleLogoutButton()
          }}>Logout</button>
        </div>
      
    </div>
  )
}


export default Navbar
