import axios from 'axios'
import {
  GET_FORECAST,
  GET_WEATHER,
  FORECAST_ERROR,
  WEATHER_ERROR
} from '../utils/types'
import responseErrorBuilder from '../utils/responseErrorBuilder'

export const getDailyForecast = (params) => async dispatch => {
  try {
    const { data } = await axios.get('/api/v1/forecast', { params })

    isFound(data)

    const { data: forecast} = data
    const mappedForecast = forecast.map(mapDataToWeatherInterface)

    dispatch({
      type: GET_FORECAST,
      payload: mappedForecast
    })
  } catch (err) {
    const error = responseErrorBuilder(err)

    dispatch({
      type: FORECAST_ERROR,
      payload: error.message
    })
  }
}

export const getWeather = (params) => async dispatch => {
  try {
    const { data } = await axios.get('/api/v1/weather', { params })

    isFound(data)

    const { data: [city] } = data
    const mappedWeather = mapDataToWeatherInterface(city)

    dispatch({
      type: GET_WEATHER,
      payload: mappedWeather
    })
  } catch (err) {
    const error = responseErrorBuilder(err)

    dispatch({
      type: WEATHER_ERROR,
      payload: error.message
    })
  }
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.city_name,
    country: data.country_code,
    date: data.ts * 1000,
    humidity: data.rh,
    icon_id: data.weather.code,
    temperature: data.temp,
    description: data.weather.description,
    wind_speed: Math.round(data.wind_spd * 3.6) // convert from m/s to km/h
  }

  if (data.valid_date) {
    mapped.valid_date = data.valid_date
  }

  if (data.weather.icon) {
    mapped.icon = data.weather.icon
  }

  if (data.min_temp && data.max_temp) {
    mapped.max = data.max_temp
    mapped.min = data.min_temp
  }

  // remove undefined fields
  Object.keys(mapped).forEach(
    key => mapped[key] === undefined && delete data[key]
  )

  return mapped
}


function isFound(data) {
  if (typeof data === 'string') {
    const customError = new Error('Location Not Found')
    customError.status = 404
    throw customError
  }
}
