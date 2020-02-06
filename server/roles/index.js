import AccessControl from 'accesscontrol'

const ac = new AccessControl()

export default (function roles() {
  ac.grant('admin')
    .readAny('user')
    .readAny('forecast')

  return ac
})()