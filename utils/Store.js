import React, { createContext, useReducer } from 'react';

export const Store = createContext();


const initialState = {}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE': return {}
    case 'DELETE_EMPLOYEE': return {}
    case 'EDIT_EMPLOYEE': return {}
    case 'SAVE_SHIPPING_ADDRESS': return {};
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}