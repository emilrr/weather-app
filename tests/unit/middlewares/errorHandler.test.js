import assert from 'assert'
import sinon from 'sinon'
import mockery from 'mockery'

describe('Unit tests for errorHandler', () => {
  let sandbox, mockedHttp, errorHandler

  before(() => {
    mockedHttp = {
      STATUS_CODES: {
        404: 'Not Found Mock',
        500: 'Internal Server Error Mock'
      }
    }
    mockery.enable({
      'warnOnReplace': false,
      'warnOnUnregistered': false
    })
    mockery.registerMock('http', mockedHttp)

    const errorHandlerFunction = require('../../../server/middlewares/errorHandler').default
    errorHandler = errorHandlerFunction({ error: () => { } })

  })

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.resetHistory()
  })

  after(() => {
    sandbox.restore()
    mockery.deregisterAll()
    mockery.disable()
  })

  it('Error Case - Should catch an error with status', async () => {
    const errMessage = 'Expected server error'
    let expectedError = new Error(errMessage)
    expectedError.status = 404
    const nextStub = sandbox.stub().throws(expectedError)
    let mockContext = {
      status: '',
      body: {}
    }

    await errorHandler(mockContext, nextStub)

    assert.ok(nextStub.calledOnce)
    assert.strictEqual(mockContext.status, expectedError.status)
    assert.deepEqual(mockContext.body, {
      error: mockedHttp.STATUS_CODES[expectedError.status],
      message: expectedError.message
    })
  })

  it('Error Case - Should catch an error with status code', async () => {
    const errMessage = 'Expected server error'
    let expectedError = new Error(errMessage)
    expectedError.statusCode = 404
    const nextStub = sandbox.stub().throws(expectedError)
    let mockContext = {
      status: '',
      body: {}
    }

    await errorHandler(mockContext, nextStub)

    assert.ok(nextStub.calledOnce)
    assert.strictEqual(mockContext.status, expectedError.statusCode)
    assert.deepEqual(mockContext.body, {
      error: mockedHttp.STATUS_CODES[expectedError.statusCode],
      message: expectedError.message
    })
  })

  it('Error Case - Should catch an error without status code', async () => {
    const errMessage = 'Expected server error'
    const deafultStatusCode = 500
    let expectedError = new Error(errMessage)
    const nextStub = sandbox.stub().throws(expectedError)
    let mockContext = {
      status: '',
      body: {}
    }

    await errorHandler(mockContext, nextStub)

    assert.ok(nextStub.calledOnce)
    assert.strictEqual(mockContext.status, deafultStatusCode)
    assert.deepEqual(mockContext.body, {
      error: mockedHttp.STATUS_CODES[deafultStatusCode],
      message: expectedError.message
    })
  })
  
  it('Ok Case - Should invoke a middleware without errors', async () => {
    const mockContext = sandbox.spy()
    const nextSpy = sandbox.spy()

    await errorHandler(mockContext, nextSpy)
    assert.ok(nextSpy.calledOnce)
    assert.ok(mockContext.notCalled)
  })
})
