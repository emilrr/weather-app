import os from 'os'
import http from 'http'
import path from 'path'
import chalk from 'chalk'
import Koa from 'koa'
import send from 'koa-send'
import mount from 'koa-mount'
import serve from 'koa-static'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import config from './config'
import router from './routes/index'
import db from './db'
import logger, { _logger } from './middlewares/logger'
import errorHandler from './middlewares/errorHandler'

export const app = new Koa()
const { port, dbUrl } = config

app.use(logger())
app.use(bodyParser())
app.use(errorHandler())
app.use(router)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  _logger.info('Build is initializing on production')
  const static_pages = new Koa()
  static_pages.use(serve(path.join(__dirname, '../client/build'))) //serve the build directory
  app.use(mount('/', static_pages))

  const buildRouter = new Router()
  buildRouter.get('*', async (ctx, next) => {
    await send(ctx, 'index.html', { root: path.join(__dirname, '../client/build') })
    await next()
  })
  app.use(buildRouter.routes())
}

app.on('error', (err, ctx) => {
  _logger.error(`SERVER ERROR | ${chalk.yellow(ctx.method)} ${chalk.green(ctx.url)}`, err.message)
})

export const runServer = async () => {
  try {
    _logger.info('Database is initializing')
    await db(dbUrl)

    const server = http.createServer(app.callback()).listen(port, '0.0.0.0')
    _logger.info('Server is starting')

    server.on('close', () => {
      _logger.info('Server closed')
      process.exit(1)
    })

    _logger.info(`Server is started: ${os.hostname}:${port}`)
    return server
  } catch (err) {
    _logger.error(`Can not start the server: ${err || 'unknown error'}`)
    if (err && err.stack) {
      _logger.error(err.stack)
    }
    process.exit(1)
  }
}
