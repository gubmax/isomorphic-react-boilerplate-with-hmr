import fetchData from './fetchData'

const getInitialProps = (url, dispatch, type) => fetchData(url)
  .then((res) => dispatch({ type, payload: res.data }))

export default getInitialProps
