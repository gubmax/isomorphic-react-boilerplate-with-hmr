import React from 'react'

import { fetchData } from '@utils'
import { useStore } from '@app/store'
import { useInitialProps } from '@app/hooks'

const UsersPage = () => {
  const { isFetching } = useInitialProps(UsersPage.getInitialProps)
  const [{ usersList }] = useStore((store) => store.users)

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
