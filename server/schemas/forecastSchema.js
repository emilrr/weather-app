import Joi from 'joi'

export const forecastSchema = {
  input: {
    headers: {
      'x-auth-token': Joi.string().required()
    },
    query: {
      city: Joi.string(),
      days: Joi.number()
    }
  }
}