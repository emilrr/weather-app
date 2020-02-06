import Joi from 'joi'

export const weatherSchema = {
  input: {
    headers: {
      'x-auth-token': Joi.string().required()
    },
    query: {
      city: Joi.string()
    }
  }
}