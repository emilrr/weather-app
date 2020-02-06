import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import forecast from './forecast'

export default combineReducers({
  alert,
  auth,
  forecast
})
