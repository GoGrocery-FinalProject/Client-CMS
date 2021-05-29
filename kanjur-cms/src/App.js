import './App.css';
import React, { useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import store from './store/index'
import { Provider } from 'react-redux'

import Login from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'
import GuardedRoute from './components/GuarderRoute'

import { login } from './store/action/action'

function App() {
  const isAuthenticated = (store.getState().isAuthenticated)
  useEffect(() => {
    if(localStorage.access_token){
      store.dispatch(login())
    }
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <div id="App">
          <Switch>
            <GuardedRoute exact path='/' component={HomePage} auth={isAuthenticated} />
            {/* <Route exact path='/' component={ HomePage }/> */}
            <Route path='/about' component={AboutPage} />
            <Route path='/login' render={(props) => <Login {...props} auth={isAuthenticated}/>}/>
            <Route path='/add' component={AddProductPage} />
            <Route path='/:id/edit' component={EditProductPage} />
            {/* <Route path='*' component={ NotFound }/> */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App
