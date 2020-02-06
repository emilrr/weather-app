import { weatherSchema } from '../schemas/weatherSchema'
import { forecastSchema } from '../schemas/forecastSchema'
import { getDailyForecastData, getWeather } from '../actions/forecast'

export default (router, joiValidator, allowIfLoggedin, grantAccess) => {
  router.get('/forecast', joiValidator(forecastSchema), allowIfLoggedin(), grantAccess('readAny', 'forecast'), getDailyForecastData)
  router.get('/weather', joiValidator(weatherSchema), allowIfLoggedin(), grantAccess('readAny', 'forecast'), getWeather)
}