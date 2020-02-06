import roles from '../roles'

export default (action, resource) => {
  return async (ctx, next) => {
    const permission = roles.can(ctx.loggedInUser.role)[action](resource)

    if (!permission.granted) {
      ctx.throw(401, { name: 'AuthorizationError', message: "You don't have enough permission to perform this action." })
    }

    await next()
  }
}
