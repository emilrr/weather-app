import winston from 'winston'
import chalk from 'chalk'
import config from '../config'

const { fileName } = config

const removeChalkColor = (message) => {
  const chalkColors = ['[32m', '[33m', '[39m', '[39m']
  chalkColors.forEach((color) => {
    message = message.replace(color, '')
  })
  return message
}

const colorLog = (message) => {
  let coloredMessage
  const methodRegExp = RegExp(/"method":\W.*?"/)
  const statusCodeRegExp = RegExp(/"statusCode":\d{3}/)
  const urlRegExp = RegExp(/"url":\W.*?"/)

  const httpMethod = message.match(methodRegExp)
  const statusCode = message.match(statusCodeRegExp)
  const url = message.match(urlRegExp)
  coloredMessage = message
    .replace(httpMethod, chalk.cyanBright.bold(httpMethod))
    .replace(url, chalk.greenBright.bold.italic(url))
    .replace(statusCode, chalk.yellowBright.bold(statusCode))
  return coloredMessage
}

const loggerTransports = {
  level: 'verbose',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(log => {
      return `${log.timestamp} | ${log.level.toUpperCase()}: ${removeChalkColor(log.message)}`
    })
  ),
  transports: [
    new winston.transports.Console({ colorize: true }),
    new winston.transports.File({
      colorize: false,
      json: false,
      filename: fileName,
      level: 'error'
    }),
    new winston.transports.File({
      colorize: false,
      json: false,
      filename: fileName,
      level: 'info'
    })
  ]
}

const createMessage = (request, response) => {
  return colorLog(JSON.stringify({
    req: {
      method: request.method.toUpperCase(),
      url: request.url,
      headers: {
        accept: request.headers.accept,
        host: request.headers.host,
        'user-agent': request.headers['user-agent'],
        'x-forwarded-for': request.headers['x-forwarded-for']
      }
    },
    res: {
      statusCode: response.status
    }
  }))
}

const winstonLogger = winston.createLogger(loggerTransports)

export const _logger = winstonLogger

export default () => {
  return async (ctx, next) => {
    await next()
    const { request, response } = ctx

    if (response.status >= 400) {
      winstonLogger.error(createMessage(request, response))
    } else {
      winstonLogger.info(createMessage(request, response))
    }
  }
}