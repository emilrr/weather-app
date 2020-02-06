import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import config from '../config'

const { jwtSecret } = config

async function hashPassword (password) {
  return await bcrypt.hash(password, 10)
}

async function validatePassword (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

function signUser (user) {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      name: user.name
    },
    jwtSecret, {
    expiresIn: '1d'
  })
}

export const signup = async (ctx) => {
  try {
    const { name, email, password, role } = ctx.request.body
    const hashedPassword = await hashPassword(password)
    const newUser = new User({ name, email, password: hashedPassword, role })
    const token = signUser(newUser)

    newUser.token = token
    await newUser.save()

    ctx.body = newUser
    ctx.status = 201
  } catch (err) {
    throw err
  }
}

export const login = async (ctx) => {
  try {
    const { email, password } = ctx.request.body
    const user = await User.findOne({ email })

    if (!user) ctx.throw(404, { message: 'Email does not exist' })

    const validPassword = await validatePassword(password, user.password)

    if (!validPassword) ctx.throw(400, { message: 'Password is not correct' })

    const token = signUser(user)

    const updatedUser = await User.findByIdAndUpdate(user._id, { token })

    ctx.body = updatedUser
  } catch (err) {
    throw err
  }
}

export const getUsers = async (ctx) => {
  try {
    const users = await User.find({})
    ctx.body = users
  } catch (err) {
    throw err
  }
}

export const getUser = async (ctx, next) => {
  try {
    const { params: { userId } } = ctx
    const user = await User.findById(userId)
    if (!user) ctx.throw(404, { message: 'User does not exist' })

    ctx.body = user
  } catch (err) {
    throw err
  }
}
