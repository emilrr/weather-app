export default () => {
  return async (ctx, next) => {
    const user = ctx.loggedInUser

    if (!user) {
      ctx.throw(401, { name: 'AuthorizationError', message: 'You need to be logged in to access this route' })
    }

    await next()
  }
}
