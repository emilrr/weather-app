import axios from 'axios'
import config from '../config'
import { _logger } from '../middlewares/logger'

const { weatherApi: { host, version, apiKey } } = config

async function requester(method, path, params, payload) {
  const instance = axios.create({
    baseURL: `${host}${version}`
  })

  try {
    const { data } = await instance({
      method,
      url: path,
      params: {
        ...params,
        key: apiKey
      },
      data: payload
    })

    return data
  } catch (err) {
    const error = err.response ? err.response : err
    _logger.error(`${method} request with a path ${path} throws an error: ${error.message}`)
    throw error
  }
}

export const getDailyForecastDailyDataByCity = async ({ city, days = 7 }) => {
  return requester('GET', '/forecast/daily', { city, days })
}

export const getCurrentWeatherByCity = async ({ city }) => {
  return requester('GET', '/current', { city })
}

