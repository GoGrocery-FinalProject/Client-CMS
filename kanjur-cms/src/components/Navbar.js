import React from 'react'
import { useDispatch } from 'react-redux'
import {
  Link
} from 'react-router-dom'
import { logout } from '../store/action/ProductAction'

function Navbar() {
  const dispatch = useDispatch()
  function handleLogoutButton(){
    localStorage.clear()
    dispatch(logout())
  }
  return (
    <div className="sidebar">
      <div className="section navbar-nav mx-auto">
        <br></br><div className="item btn" style={{width:"100%"}}>Dashboard</div><br></br>
        <Link to="/"><div className="nav-item item btn" style={{width:"100%"}}>Product List</div></Link>
        <Link to="/add"><div className="nav-item item btn" style={{width:"100%"}}>Add new Product</div></Link>
        <Link to="/create-report"><div className="nav-item item btn" style={{width:"100%"}}>Create Daily Report</div></Link>
        <Link to="/report"><div className="nav-item item btn" style={{width:"100%"}}>Report</div></Link>
        <Link to="/transaction"><div className="nav-item item btn" style={{width:"100%"}}>Transaction</div></Link>
      </div>
        <div className="section navbar-nav mx-auto">
          <button className="item btn" onClick={(e) => {
            e.preventDefault()
            handleLogoutButton()
          }}>Logout</button>
        </div>
      
    </div>
  )
}


export default Navbar
