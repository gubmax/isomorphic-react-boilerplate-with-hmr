const dotenv = require('dotenv')

const paths = require('./paths')

const res = dotenv.config({ path: `${paths.appPath}/.env.${process.env.NODE_ENV}` })

if (res.error) {
  throw res.error
}

module.exports = res.parsed
