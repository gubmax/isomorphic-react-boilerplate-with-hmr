import React from 'react'

import { useRootState } from '@utils'
import { useInitialProps } from '@hooks'

const UsersPage = () => {
  const [{ isFetching }] = useInitialProps('/users')
  const [{ usersList }] = useRootState()

  return (
    <>
      <p>UsersPage</p>
      {
        isFetching && <span>Loading...</span>
      }
      <ul>
        {
          usersList && usersList.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
        }
      </ul>
    </>
  )
}

export default UsersPage
