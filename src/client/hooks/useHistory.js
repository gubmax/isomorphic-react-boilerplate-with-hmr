import { useContext } from 'react'
import { __RouterContext } from 'react-router-dom'

const useHistory = () => useContext(__RouterContext)

export default useHistory
