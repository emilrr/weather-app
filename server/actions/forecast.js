import { getDailyForecastDailyDataByCity, getCurrentWeatherByCity } from '../services/weatherbit'

export const getDailyForecastData = async (ctx) => {
  try {
    ctx.body = await getDailyForecastDailyDataByCity(ctx.query)
  } catch (err) {
    throw err
  }
}

export const getWeather = async (ctx) => {
  try {
    ctx.body = await getCurrentWeatherByCity(ctx.query)
  } catch (err) {
    throw err
  }
}