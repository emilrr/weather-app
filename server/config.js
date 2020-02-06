export default {
  baseUrl: process.env.APP_SERVER_BASE_URL || '/api/v1',
  port: process.env.APP_SERVER_PORT || 3113,
  dbUrl: process.env.APP_DB_URL || 'mongodb://localhost:27017/weather-app',
  jwtSecret: process.env.APP_JWT_SECRET,
  weatherApi: {
    host: process.env.APP_WEATHER_API_HOST || 'http://api.weatherbit.io',
    version: process.env.APP_WEATHER_API_VERSION || '/v2.0',
    apiKey: process.env.APP_WEATHER_API_KEY
  },
  fileName: process.env.LOG_FILE || 'filelog.log'
}