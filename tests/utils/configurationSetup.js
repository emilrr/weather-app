/**
 * Set the needed env variables for test
 */
export const setEnvConf = () => {
  process.env.APP_SERVER_BASE_URL = '/api/v1'
  process.env.APP_SERVER_PORT = 3113
  process.env.APP_DB_URL = 'mongodb://localhost:27017/express-template'
  process.env.APP_JWT_SECRET = 'test_secret'
  process.env.APP_WEATHER_API_HOST = 'http://fake_weatherbit'
  process.env.APP_WEATHER_API_VERSION = '/v2.0'
  process.env.APP_WEATHER_API_KEY = 'fake_key'
}

/**
 * Delete variables
 */
export const deleteEnvConf = () => {
  Object.keys(process.env).filter(key => key.startsWith('APP')).forEach(key => {
    delete process.env[key]
  })
}
