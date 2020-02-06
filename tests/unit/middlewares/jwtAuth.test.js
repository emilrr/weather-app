import assert from 'assert'
import sinon from 'sinon'
import mockery from 'mockery'
import jwt from 'jsonwebtoken'

describe('Unit tests for allowIfLoggedin', () => {
  let sandbox, jwtAuth, ctxThrowStub, findByIdStub, jwtVerifyStub

  before(() => {
    sandbox = sinon.createSandbox()
    ctxThrowStub = sandbox.stub()
    findByIdStub = sandbox.stub()
    jwtVerifyStub = sandbox.stub(jwt, 'verify')

    const userMock = {
      findById: findByIdStub
    }

    mockery.enable({
      'warnOnReplace': false,
      'warnOnUnregistered': false
    })
    mockery.registerMock('../models/user', userMock)

    const jwtAuthFunction = require('../../../server/middlewares/jwtAuth').default
    jwtAuth = jwtAuthFunction()
  })

  afterEach(() => {
    sandbox.resetHistory()
  })

  after(() => {
    sandbox.restore()
    mockery.deregisterAll()
    mockery.disable()
  })

  it('Error Case - Should thrown an error when the token has expired', async () => {
    const expectedMessage = 'Expected auth error'
    const nextSpy = sandbox.spy()
    const mockContext = {
      headers: {
        'x-auth-token': 'fake-token'
      },
      throw: ctxThrowStub
    }
    jwtVerifyStub.returns({
      exp: 0
    })
    ctxThrowStub.throws(new Error(expectedMessage))

    try {
      await jwtAuth(mockContext, nextSpy)
    } catch (err) {
      assert.strictEqual(err.message, expectedMessage)
      assert.ok(jwtVerifyStub.calledOnce)
      assert.ok(nextSpy.notCalled)
      assert.ok(findByIdStub.notCalled)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Ок Case - Should not thrown an error when the token is missed', async () => {
    const nextSpy = sandbox.spy()
    const mockContext = {
      headers: {
      }
    }
    await jwtAuth(mockContext, nextSpy)
    assert.ok(nextSpy.calledOnce)
    assert.ok(jwtVerifyStub.notCalled)
  })

  it('Ок Case - Should attach the user to the context', async () => {
    const expectedUser = {
      name: 'Expected user'
    }
    const nextSpy = sandbox.spy()
    const mockContext = {
      headers: {
        'x-auth-token': 'fake-token'
      }
    }
    jwtVerifyStub.returns({
      exp: Date.now()
    })
    findByIdStub.returns(expectedUser)

    await jwtAuth(mockContext, nextSpy)

    assert.ok(nextSpy.calledOnce)
    assert.ok(jwtVerifyStub.calledOnce)
    assert.ok(findByIdStub.calledOnce)
    assert.deepStrictEqual(mockContext.loggedInUser, expectedUser)

  })
})
