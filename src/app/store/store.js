import React, {
  createContext, useContext, useReducer, useMemo,
} from 'react'

const StoreContext = createContext(null)

export const StoreProvider = ({ state, reducer, children }) => {
  const [contextState, contextDispatch] = useReducer(reducer, state)
  const value = useMemo(() => [contextState, contextDispatch], [contextState])
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = (getValue) => {
  const [state, dispatch] = useContext(StoreContext)
  const value = getValue !== undefined ? getValue(state) : state
  return [value, dispatch]
}
