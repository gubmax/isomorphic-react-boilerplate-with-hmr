const {
  APP_HOST, APP_PORT, APP_SERVER_PORT, APP_PROTOCOL,
  APP_API_PREFIX, APP_PUBLIC_URL,
} = process.env

const settings = {
  protocol: APP_PROTOCOL,
  host: APP_HOST,
  port: APP_PORT,
  serverPort: APP_SERVER_PORT,
  apiPrefix: APP_API_PREFIX,
  publicUrl: APP_PUBLIC_URL,
}

module.exports = settings
