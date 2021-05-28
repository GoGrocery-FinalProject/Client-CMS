export function fetchProduct(link) {
  return function (dispatch) {
    let payload = {
      data: [],
      loading: true,
      error: null
    }
    fetch(link)
      .then(response => response.json())
      .then(data => {
        payload.data = data
        payload.loading = false
      })
      .catch(err => {
        payload.error = err
      })
      .finally(() => {
        dispatch({ type: "GET_ALL_PRODUCT", payload: payload })
      }) 
  }
}

export function login() {
  return function (dispatch) {
    dispatch({ type: "LOGIN", payload: {name: 'a'} })
  }
}