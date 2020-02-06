import { STATUS_CODES } from 'http'

export default () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500
      ctx.body = {
        error: STATUS_CODES[ctx.status],
        message: err.message
      }
    }
  }
}