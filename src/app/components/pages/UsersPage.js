import React from 'react'

import { useRootState, fetchData } from '@utils'
import { useInitialProps } from '@app/hooks'

const UsersPage = () => {
  const { isFetching } = useInitialProps(UsersPage.getInitialProps)
  const [{ usersList }] = useRootState()

  return (
    <>
      <p>UsersPage</p>
      {
        isFetching
          ? <span>Loading...</span>
          : (
            <ul>
              {
                usersList && usersList.map((user) => (
                  <li key={user.id}>{user.name}</li>
                ))
              }
            </ul>
          )
      }
    </>
  )
}

UsersPage.getInitialProps = async (dispatch) => {
  const res = await fetchData('/users', { method: 'POST' })
  return dispatch({ type: 'USERS_SET', payload: res })
}

export default UsersPage
