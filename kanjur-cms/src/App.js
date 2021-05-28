import './App.css';
import React from 'react'

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
// import GuardedRoute from './components/GuarderRoute'

function App() {
  // const isAuthenticated = (store.getState().isAuthenticated)

  return (
    <Provider store={store}>
      <Router>
        <div id="App">
          <Switch>
            {/* <GuardedRoute exact path='/' component={HomePage} auth={isAuthenticated} /> */}
            <Route exact path='/' component={ HomePage }/>
            <Route path='/about' component={AboutPage} />
            <Route path='/login' component={Login} />
            <Route path='/add' component={AddProductPage} />
            {/* <Route path='*' component={ NotFound }/> */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App
