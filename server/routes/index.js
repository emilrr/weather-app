import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import config from '../config'
import joiValidator from '../middlewares/joiValidator'
import jwtAuth from '../middlewares/jwtAuth'
import grantAccess from '../middlewares/grantAccess'
import allowIfLoggedin from '../middlewares/allowIfLoggedin'

const { baseUrl } = config
const router = new Router().prefix(baseUrl)

router.use(jwtAuth())

fs.readdirSync(__dirname)
  .filter(routerFile => routerFile !== path.basename(__filename) && fs.lstatSync(path.join(__dirname, routerFile)).isFile())
  .forEach((routerFile) => {
    // eslint-disable-next-line import/no-dynamic-require
    (require(path.join(__dirname, routerFile)).default)(router, joiValidator,allowIfLoggedin, grantAccess)
  })

export default router.routes()
