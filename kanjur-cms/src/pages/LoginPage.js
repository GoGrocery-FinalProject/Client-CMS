import React from 'react'
import bacground from '../assets/bg_1.jpg'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/action/ProductAction'

function Login({auth}) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.isAuthenticated)

  function handleLogin() {
    localStorage.setItem('access_token', 'adatoken')
    dispatch(login())
  }

  if (isAuthenticated === true) {
    return <Redirect to={'/'} />
  }
  return (
    <div className="container-fluid">
    <div className="row no-gutter " style={{marginTop: '10%'}}>
      <div className="col-md-5 offset-1 d-none d-md-flex bg-image">
        <img width="100%" src={bacground} alt="bgimage"/>
      </div>
      <div className="col-md-5 border bg-white">
        <div className="login d-flex align-items-center py-5">
          <div className="container">
            <h1 style={{textAlign: 'center', marginTop: '10%'}}>Welcome To Kanjur CMS</h1>
            <div className="row">
              <div className="col-lg-10 col-xl-7 mx-auto">
                <h4 className="display-4">Login</h4>
                <form 
                  onSubmit={(event) => {
                  event.preventDefault()
                  handleLogin()}}
                  >
                  <div className="form-group mb-3">
                    <input
                      id="inputEmail"
                      type="email"
                      placeholder="Email address"
                      required
                      className="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      id="inputPassword"
                      type="password"
                      placeholder="Password"
                      required
                      className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm" 
                    style={{margin: 'auto'}}
                    
                  >Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
