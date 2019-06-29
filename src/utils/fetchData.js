const axios = require('axios')
const {
  PROTOCOL,
  HOST,
  PORT_SERVER,
} = require('@config/env')

const fetchData = (url = '', data = {}) => (
  axios({
    method: 'POST',
    url: `${PROTOCOL}://${HOST}:${PORT_SERVER}${url}`,
    data,
  })
)

export default fetchData
