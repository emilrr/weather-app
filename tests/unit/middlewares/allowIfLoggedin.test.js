import assert from 'assert'
import sinon from 'sinon'
import allowIfLoggedinFunction from '../../../server/middlewares/allowIfLoggedin'

const allowIfLoggedin = allowIfLoggedinFunction()

describe('Unit tests for allowIfLoggedin', () => {
  let sandbox, ctxThrowStub

  before(() => {
    sandbox = sinon.createSandbox()
    ctxThrowStub = sandbox.stub()
  })

  afterEach(() => {
    sandbox.resetHistory()
  })

  after(() => {
    sandbox.restore()
  })

  it('Error Case - Should thrown an error when the user is missed', async () => {
    const errMessage = 'Expected Error'
    ctxThrowStub.throws(new Error(errMessage))
    const mockContext = {
      throw: ctxThrowStub
    }
    const nextSpy = sandbox.spy()

    try {
      await allowIfLoggedin(mockContext, nextSpy)
    } catch (err) {
      assert.ok(err)
      assert.ok(nextSpy.notCalled)
      assert.ok(ctxThrowStub.calledOnce)
      assert.equal(err.message, errMessage)
      return
    }

    assert.fail('Error is not thrown')
  })

  it('Ok Case - Should invoke a middleware with logged user', async () => {
    const mockContext = {
      loggedInUser: {
        name: 'admin'
      },
      throw: ctxThrowStub
    }
    const nextSpy = sandbox.spy()

    await allowIfLoggedin(mockContext, nextSpy)
    assert.ok(nextSpy.calledOnce)
    assert.ok(ctxThrowStub.notCalled)

  })
})
