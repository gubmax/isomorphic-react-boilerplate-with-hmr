import fetch from 'node-fetch'

const { PROTOCOL, HOST, PORT_SERVER } = require('@config/env')

const fetchData = async (url, options = {}) => (
  fetch(`${PROTOCOL}://${HOST}:${PORT_SERVER}${url}`, options)
    .then((res) => res.json())
)

export default fetchData
