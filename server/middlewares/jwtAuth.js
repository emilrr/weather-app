import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/user'

const jwtSecret = config.jwtSecret

export default () => {
  return async (ctx, next) => {
    const token = ctx.headers['x-auth-token']

    if (token) {
      const { userId, exp } = await jwt.verify(token, jwtSecret)

      if (exp < Date.now().valueOf() / 1000) {
        ctx.throw(401, { name: 'AuthorizationError', message: 'JWT token has expired, please login to obtain a new on!' })
      }

      ctx.loggedInUser = await User.findById(userId)
    }

    await next()
  }
}