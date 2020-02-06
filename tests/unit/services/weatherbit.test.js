import sinon from 'sinon'
import assert from 'assert'
import axios from 'axios'
import mockery from 'mockery'
import { forecastResponse, weatherResponse } from '../../mocks/weatherbit'

describe('Unit tests for the weatherbit service', () => {
  let sandbox, axiosStub, instanceStub

  before(() => {
    sandbox = sinon.createSandbox()
    axiosStub = sandbox.stub(axios, 'create')
    instanceStub = sandbox.stub()

    mockery.enable({
      'warnOnReplace': false,
      'warnOnUnregistered': false
    })
    mockery.registerMock('../middlewares/logger', { _logger: { error: () => { } } })

    weatherbitService = require('../../../server/services/weatherbit')
  })

  afterEach(() => {
    sandbox.resetHistory()
  })

  after(() => {
    sandbox.restore()
  })

  it('Error Case - Should throw an error when try to get forecast data by city', async () => {
    const errMessage = 'Expected forecast error'
    instanceStub.rejects(new Error(errMessage))
    axiosStub.callsFake(() => instanceStub)

    try {
      await weatherbitService.getDailyForecastDailyDataByCity({ city: 'Sof' })
    } catch (err) {
      assert.ok(err)
      assert.deepStrictEqual(err.message, errMessage)
      assert.ok(instanceStub.calledOnce)
      assert.ok(axiosStub.calledOnce)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Error Case - Should throw an error when try to get forecast data by city and days', async () => {
    const errMessage = 'Expected forecast error'
    instanceStub.rejects({ response: { message: errMessage } })
    axiosStub.callsFake(() => instanceStub)

    try {
      await weatherbitService.getDailyForecastDailyDataByCity({ city: 'Sof', days: 7 })
    } catch (err) {
      assert.ok(err)
      assert.deepStrictEqual(err.message, errMessage)
      assert.ok(instanceStub.calledOnce)
      assert.ok(axiosStub.calledOnce)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Error Case - Should throw an error when try to get weather data by city and days', async () => {
    const errMessage = 'Expected weather error'
    instanceStub.rejects({ response: { message: errMessage } })
    axiosStub.callsFake(() => instanceStub)

    try {
      await weatherbitService.getCurrentWeatherByCity({ city: 'Sof' })
    } catch (err) {
      assert.ok(err)
      assert.deepStrictEqual(err.message, errMessage)
      assert.ok(instanceStub.calledOnce)
      assert.ok(axiosStub.calledOnce)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Ok Case - Should return forecast data by city and days', async () => {
    instanceStub.returns({ data: forecastResponse })
    axiosStub.callsFake(() => instanceStub)

    const response = await weatherbitService.getDailyForecastDailyDataByCity({ city: 'Sof', days: 7 })

    assert.deepStrictEqual(response, forecastResponse)
    assert.ok(instanceStub.calledOnce)
    assert.ok(axiosStub.calledOnce)
  })

  it('Ok Case - Should return weather data by city', async () => {
    instanceStub.returns({ data: weatherResponse })
    axiosStub.callsFake(() => instanceStub)

    const response = await weatherbitService.getCurrentWeatherByCity({ city: 'Sof', days: 7 })

    assert.deepStrictEqual(response, weatherResponse)
    assert.ok(instanceStub.calledOnce)
    assert.ok(axiosStub.calledOnce)
  })
})