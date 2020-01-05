import fetchData from './fetchData'

const getInitialProps = (url, dispatch, type) => (
  fetchData(url, { method: 'POST' })
    .then((res) => dispatch({ type, payload: res }))
)

export default getInitialProps
