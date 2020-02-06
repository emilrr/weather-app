import React, { useEffect } from 'react'
import { Route, Switch, withRouter, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import { REDIRECT_SUCCESS } from '../../utils/types'
import Forecast from '../forecast/Forecast'
import NotFound from '../layout/NotFound'
import PrivateRoute from './PrivateRoutes'

const Routes = ( ) => {
  const dispach = useDispatch()
  const auth = useSelector(state => state.auth)
  let history = useHistory();

  useEffect(() => {
    if (!auth.isAuthenticated && auth.loginRedirect) {
      history.push('/login')
      dispach({
        type: REDIRECT_SUCCESS
      })
    }
  }, [auth, dispach])

  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/forecast' component={Forecast} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
