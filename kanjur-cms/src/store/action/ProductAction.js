import axios from 'axios'
import Swal from 'sweetalert2'
const axiosInstance = axios.create({
  baseURL: 'http://54.151.182.9:3000'
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
        localStorage.setItem("access_token", response.data.token)
        dispatch({ type: "LOGIN", payload: response.data })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`,
        })
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
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Logout Successfully',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

export function fetchProduct() {
  return function (dispatch) {
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

export function fetchProductById(barcode) {
  return function (dispatch) {
    axiosInstance({
      method: 'GET',
      url: `/products/${barcode}`,
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Item ${payload.name} has been added`,
          showConfirmButton: false,
          timer: 1500
        })
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

export function deleteProduct(id) {
  return function (dispatch) {
    axiosInstance({
      method: 'DELETE',
      url: `/products/${id}`,
      headers: {
        token: localStorage.access_token
      },
    })
      .then(() => {
        Swal.fire(
          'Deleted!',
          'this product has been deleted.',
          'success'
        )
        dispatch(fetchProduct())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

