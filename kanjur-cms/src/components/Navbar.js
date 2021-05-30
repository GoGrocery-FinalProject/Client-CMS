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
        <br></br><div className="item btn">Dashboard</div><br></br>
        <Link to="/"><div className="nav-item item btn">Product List</div></Link>
        <Link to="/add"><div className="nav-item item btn">Add new Product</div></Link>
        <Link to="/report"><div className="nav-item item btn">Create Daily Report</div></Link>
        <Link to="/transaction"><div className="nav-item item btn">Transaction</div></Link>
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
