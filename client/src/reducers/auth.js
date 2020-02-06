import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REDIRECT_SUCCESS
} from '../utils/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null,
  loginRedirect: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        loginRedirect: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
        loginRedirect: false
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loginRedirect: true
      }
    case REDIRECT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        loginRedirect: false
      }
    default:
      return state
  }
}
