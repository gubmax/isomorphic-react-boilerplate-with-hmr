import fetch from 'node-fetch'

const {
  APP_PROTOCOL, APP_HOST, APP_SERVER_PORT, APP_API_PREFIX,
} = process.env

const fetchData = async (url, options) => (
  fetch(`${APP_PROTOCOL}://${APP_HOST}:${APP_SERVER_PORT}${APP_API_PREFIX}${url}`, options)
    .then((res) => res.json())
)

export default fetchData
