import axios from 'axios'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../utils/types'
import setAuthToken from '../utils/setAuthToken'
import responseErrorBuilder from '../utils/responseErrorBuilder'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
    dispatch({
      type: USER_LOADED,
      payload: JSON.parse(atob(localStorage.token.split('.')[1]))
    })
  }
}

export const register = ({ name, email, password, role }) => async dispatch => {
  const body = JSON.stringify({ name, email, password, role })

  try {
    const { data } = await axios.post('/api/v1/users/signup', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    })
    dispatch(loadUser())
  } catch (err) {
    const error = responseErrorBuilder(err)

    dispatch(setAlert(error.message, 'danger'))
    dispatch({
      type: REGISTER_FAIL,
      payload: error.message
    })
  }
}

export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password })

  try {
    const { data } = await axios.post('/api/v1/users/login', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })
    dispatch(loadUser())
  } catch (err) {
    const error = responseErrorBuilder(err)

    dispatch({
      type: LOGIN_FAIL,
      payload: error.message
    })
    dispatch(setAlert(error.message, 'danger'))
  }
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
