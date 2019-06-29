import React, { createContext, useReducer, useContext } from 'react'

const RootStateContext = createContext()

const RootStateProvider = ({ state, reducer, children }) => (
  <RootStateContext.Provider value={useReducer(reducer, state)}>
    {children}
  </RootStateContext.Provider>
)

const useRootState = () => useContext(RootStateContext)

export {
  RootStateContext,
  RootStateProvider,
  useRootState,
}
