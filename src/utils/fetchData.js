const axios = require('axios')

const { PROTOCOL, HOST, PORT_SERVER } = require('@config/env')

const fetchData = async ({
  method = 'GET',
  url = '',
  data = {},
}) => {
  const params = {
    method,
    url: `${PROTOCOL}://${HOST}:${PORT_SERVER}${url}`,
  }

  if (method === 'POST') {
    params.body = data
  }

  return axios(params)
}

export default fetchData
