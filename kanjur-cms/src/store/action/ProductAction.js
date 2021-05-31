import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://kanjur-test.herokuapp.com'
})

export function login(email, password) {
  return function (dispatch) {
    axiosInstance({
      method: 'POST',
      url: '/login',
      data: {
        email,
        password
      }
    })
      .then((response) => {
        console.log(response.data)
        localStorage.setItem("access_token", response.data.token)
        dispatch({ type: "LOGIN", payload: response.data })
      })
  }
}

export function authenticated() {
  return function (dispatch) {
    dispatch({ type: "AUTHENTICATED" })
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
        token: localStorage.access_token
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

export function fetchProductById(id) {
  return function (dispatch) {
    // let payload = {
    //   data: [],
    //   loading: true,
    //   error: null
    // }
    axiosInstance({
      method: 'GET',
      url: `/products/${id}`,
      headers: {
        token: localStorage.access_token
      }
    })
      .then((response) => {
        dispatch({ type: "GET_PRODUCT_ID", payload: response.data })
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
        token: localStorage.access_token
      },
      data: {
        name: payload.name,
        barcode_number: payload.barcode,
        image_url: payload.image_url,
        description: payload.description,
        price: +payload.price,
        stock: +payload.stock,
        stockBefore: +payload.stock
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
    axiosInstance({
      method: 'PUT',
      url: `/products/${id}`,
      headers: {
        token: localStorage.access_token
      },
      data: {
        name: payload.name,
        barcode_number: payload.barcode,
        image_url: payload.image_url,
        description: payload.description,
        price: +payload.price,
        stock: +payload.stock,
        stockBefore: +payload.stockBefore
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

export function patchStockProduct(id, payload) {
  return function (dispatch) {
    // console.log(payload, id)
    axiosInstance({
      method: 'PATCH',
      url: `/products/${id}`,
      headers: {
        token: localStorage.access_token
      },
      data: {
        stock: +payload.stock
      }
    })
      .then((response) => {
        dispatch(editProduct(id, { stockBefore: payload.stock, name: payload.data.name, stock: payload.stock }))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function deleteProduct(id) {
  return function (dispatch) {
    // console.log(payload, id)
    axiosInstance({
      method: 'DELETE',
      url: `/products/${id}`,
      headers: {
        token: localStorage.access_token
      },
    })
      .then((response) => {
        dispatch(fetchProduct())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

