export default (error) => {
  let err = {
    message: 'Internal server error',
    status: 500
  }

  if (error.response) {
    const { response: { status, statusText, data: { message } } } = error
    const errorMessage = message ? message : statusText
    err.status = status
    err.message = errorMessage
  } else {
    err.message = error.message
    err.status = error.status || err.status
  }

  return err
}
