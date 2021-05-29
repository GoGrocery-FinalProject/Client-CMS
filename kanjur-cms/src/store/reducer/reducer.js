const initialState = {
  products: [],
  isAuthenticated: false,
  user: {}
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case "GET_ALL_PRODUCT":
      return { ...state, products: payload }
    case "LOGIN":
      return { ...state, user: payload, isAuthenticated: true }
    case "LOGOUT":
      return { ...state, user: {}, isAuthenticated: false }
    default:
      return state
  }
}

export default reducer