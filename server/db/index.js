import mongoose from 'mongoose'
import { _logger } from '../middlewares/logger'

export default async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  } catch (err) {
    _logger.error(`Connection error: ${err.message}`)
    throw err
  }

  _logger.info('Database is connected')
  const db = mongoose.connection

  return db
}
