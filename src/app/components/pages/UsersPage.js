import React from 'react'

import { fetchData } from '@helpers'
import { useStore } from '@app/store'
import { useInitialProps } from '@app/hooks'

const UsersPage = () => {
  const [{ usersList }] = useStore((store) => store.users)
  const { isFetching } = useInitialProps(UsersPage.getInitialProps, !usersList.length)

  return (
    <>
      {
        isFetching
          ? <span>Loading...</span>
          : (
            usersList && usersList.map((person) => (
              <p key={person.id}>{person.name}</p>
            ))
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
