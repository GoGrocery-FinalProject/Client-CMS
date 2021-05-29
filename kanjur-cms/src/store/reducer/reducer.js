const initialState = {
  products: [],
  transactions: [],
  reports: [],
  product: {},
  isAuthenticated: false,
  user: {}
}

function reducer(state = initialState, action) {
  const { type, payload } = action
  switch(type) {
    case "GET_ALL_PRODUCT":
      return { ...state, products: payload }
    case "GET_PRODUCT_ID":
      return { ...state, product: payload }
    case "GET_ALL_TRANSACTION":
      return { ...state, transactions: payload }
    case "GET_ALL_REPORT":
      return { ...state, reports: payload }
    case "LOGIN":
      return { ...state, user: payload, isAuthenticated: true }
    case "LOGOUT":
      return { ...state, user: {}, isAuthenticated: false }
    default:
      return state
  }
}

export default reducer