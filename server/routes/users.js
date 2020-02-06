import { 
  userSignUpSchema,
  userLoginSchema,
  getUserByIdSchema,
  getUsersSchema
 } from '../schemas/userSchema'
import { signup, login, getUser, getUsers } from '../actions/user'

export default (router, joiValidator, allowIfLoggedin, grantAccess) => {
  router.post('/users/signup', joiValidator(userSignUpSchema), signup)
  router.post('/users/login', joiValidator(userLoginSchema), login)
  router.get('/users/:userId', joiValidator(getUserByIdSchema), allowIfLoggedin(), grantAccess('readAny', 'user'), getUser)
  router.get('/users', joiValidator(getUsersSchema), allowIfLoggedin(), grantAccess('readAny', 'user'), getUsers)
}