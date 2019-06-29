const usersReducer = (state, { type, payload }) => {
  switch (type) {
    case 'USERS_SET':
      return {
        ...state,
        usersList: payload,
      }
    default:
      return state
  }
}

export default usersReducer
