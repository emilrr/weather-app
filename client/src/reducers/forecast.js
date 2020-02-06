import {
  GET_FORECAST,
  GET_WEATHER,
  FORECAST_ERROR,
  WEATHER_ERROR
} from '../utils/types'

const initialState = {
  forecast: [],
  weather: {},
  loading: true,
  error: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_FORECAST:
      return {
        ...state,
        forecast: payload,
        loading: false,
        error: false
      }
    case GET_WEATHER:
      return {
        ...state,
        weather: payload,
        loading: false,
        error: false
      }
    case FORECAST_ERROR:
    case WEATHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state
  }
}
