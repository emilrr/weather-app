import assert from 'assert'
import sinon from 'sinon'
import mockery from 'mockery'

describe('Unit tests for action forecast', () => {
  let sandbox, forecast, getForecastStub, getWeatherStub

  before(() => {
    sandbox = sinon.createSandbox()

    getForecastStub = sandbox.stub()
    getWeatherStub = sandbox.stub()

    const mockedService = {
      getDailyForecastDailyDataByCity: getForecastStub,
      getCurrentWeatherByCity: getWeatherStub
    }

    mockery.enable({
      'warnOnReplace': false,
      'warnOnUnregistered': false
    })
    mockery.registerMock('../services/weatherbit', mockedService)

    forecast = require('../../../server/actions/forecast')
  })

  afterEach(() => {
    sandbox.resetHistory()
  })

  after(() => {
    sandbox.restore()
    mockery.deregisterAll()
    mockery.disable()
  })

  it('Error Case - Should thrown error when try to get forecast data', async () => {
    const expectedError = new Error('Expected forecast error')
    getForecastStub.rejects(expectedError)

    try {
      await forecast.getDailyForecastData({})
    } catch(err) {
      assert.deepStrictEqual(err.message, expectedError.message)
      assert.ok(getForecastStub.calledOnce)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Error Case - Should thrown error when try to get weather data', async () => {
    const expectedError = new Error('Expected weather error')
    getWeatherStub.rejects(expectedError)

    try {
      await forecast.getWeather({})
    } catch (err) {
      assert.deepStrictEqual(err.message, expectedError.message)
      assert.ok(getWeatherStub.calledOnce)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Ok Case - Should get forecast data', async () => {
    getForecastStub.returns({})

    await forecast.getDailyForecastData({})
    assert.ok(getForecastStub.calledOnce)
  })

  it('Ok Case - Should get weather data', async () => {
    getWeatherStub.returns({})

    await forecast.getWeather({})
    assert.ok(getWeatherStub.calledOnce)
  })
})
