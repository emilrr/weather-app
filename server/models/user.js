import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin']
  },
  token: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const user = new model('User', userSchema)

export default user
