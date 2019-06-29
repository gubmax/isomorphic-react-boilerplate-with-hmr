import usersReducer from './reducers'

const rootReducer = (state, action) => ({
  ...usersReducer(state, action),
  // ...anotherReducer(state, action)
})

export default rootReducer
