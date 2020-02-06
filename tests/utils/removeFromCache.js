export default (modulePath) => {
  const resolvedPath = require('path').join(__dirname, modulePath)
  delete require.cache[resolvedPath]
}
