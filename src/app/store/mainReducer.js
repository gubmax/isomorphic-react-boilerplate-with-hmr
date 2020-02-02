import { usersInitialState, usersReducer } from './reducers'

const initialState = {
  users: usersInitialState,
}

const mainReducer = (state, action) => ({
  users: usersReducer(state, action),
})

export {
  initialState,
  mainReducer,
}
