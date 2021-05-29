import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000'
})

export function login() {
  return function (dispatch) {
    dispatch({ type: "LOGIN", payload: { name: 'a' } })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({ type: "LOGOUT" })
  }
}

export function fetchProduct() {
  return function (dispatch) {
    // let payload = {
    //   data: [],
    //   loading: true,
    //   error: null
    // }
    axiosInstance({
      method: 'GET',
      url: '/products',
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then((response) => {
        dispatch({ type: "GET_ALL_PRODUCT", payload: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function addProduct(payload) {
  return function (dispatch) {
    // console.log(payload, id)
    axiosInstance({
      method: 'POST',
      url: `/products/`,
      headers: {
        access_token: localStorage.access_token
      },
      data: {
        name: payload.name,
        barcodenumber: payload.barcode,
        price: payload.price,
        stock: payload.stock
      }
    })
      .then((response) => {
        dispatch(fetchProduct())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function editProduct(id, payload) {
  return function (dispatch) {
    // console.log(payload, id)
    axiosInstance({
      method: 'PUT',
      url: `/products/${id}`,
      headers: {
        access_token: localStorage.access_token
      },
      data: {
        name: payload.name,
        barcodenumber: payload.barcode,
        price: payload.price,
        stock: payload.stock
      }
    })
      .then((response) => {
        dispatch(fetchProduct())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
