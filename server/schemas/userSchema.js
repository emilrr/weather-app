import Joi from 'joi'

export const userSignUpSchema = {
  input: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().valid('admin').required()
    }
  }
}

export const userLoginSchema = {
  input: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }
}

export const getUserByIdSchema = {
  input: {
    headers: {
      'x-auth-token': Joi.string().required()
    }
  }
}

export const getUsersSchema = {
  input: {
    headers: {
      'x-auth-token': Joi.string().required()
    },
    query: {
      name: Joi.string(),
      email: Joi.string(),
      role: Joi.string()
    }
  }
}
