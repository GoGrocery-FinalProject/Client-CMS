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
import DetailProductPage from './pages/DetailProductPage'
import TransactionPage from './pages/TransactionPage';
import GuardedRoute from './components/GuarderRoute'
import CreateReport from './pages/CreateReport'
import Report from './pages/ReportPage'
import DetailReport from './pages/DetailReport'

import { authenticated } from './store/action/ProductAction'

function App() {
  const isAuthenticated = (store.getState().isAuthenticated)
  useEffect(() => {
    if(localStorage.access_token){
      store.dispatch(authenticated())
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
            <GuardedRoute path='/add' component={AddProductPage} auth={isAuthenticated} />
            <Route path='/:id/detail' component={DetailProductPage} />
            {/* <Route path='*' component={ NotFound }/> */}
            <GuardedRoute path='/create-report' component={CreateReport} auth={isAuthenticated} />
            <GuardedRoute path='/transaction/:order_id' component={TransactionPage} auth={isAuthenticated} />
            <GuardedRoute path='/report' component={Report} auth={isAuthenticated} />
            <Route path='/:id/detail-report' component={DetailReport} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App
