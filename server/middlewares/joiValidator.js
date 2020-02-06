import Joi from 'joi'

const rawValidate = (data, schema) => {
  if (!schema || !Object.keys(schema).length) {
    return { error: null, isJoi: true }
  } else {
    return Joi.validate(data, schema)
  }
}

const createObjectBasedOnAnother = (basedObject, object) => {
  const newObject = {}
  Object.keys(basedObject).forEach(key => {
    newObject[key] = object[key]
  })
  return newObject
}

const assertCorrectParams = (input, aliesObject, alies, assert) => {
  const schema = input[alies] || {}

  if (alies === 'headers') {
    // Valid only the keys that defined in the route schema and overlook the ones are not defined
    aliesObject = createObjectBasedOnAnother(schema, aliesObject)
  }

  const { error } = rawValidate(aliesObject, schema)
  assert(!error, 400, error)
}

export default ({ input }) => {
  return async (ctx, next) => {
    const {
      assert,
      request: { body } = {},
      query,
      params,
      headers
    } = ctx

    const aliases = { body, query, params, headers }

    /* input validation */
    for (let alies in aliases) {
      assertCorrectParams(input, aliases[alies], alies, assert)
    }

    await next()
  }
}
