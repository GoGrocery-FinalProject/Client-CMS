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
      <div className="section">
        <div className="item">Dashboard</div>
        <Link to="/"><div className="item btn">Product List</div></Link>
        <Link to="/add"><div className="item btn">Add new Product</div></Link>
        <Link to="/report"><div className="item btn">Create Daily Report</div></Link>
        <Link to="/transaction"><div className="item btn">Transaction</div></Link>
      </div>
        <div className="section">
          <button className="item btn" onClick={(e) => {
            e.preventDefault()
            handleLogoutButton()
          }}>Logout</button>
        </div>
      
    </div>
  )
}


export default Navbar
