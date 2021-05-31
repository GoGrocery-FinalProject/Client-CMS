import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

export function fetchTransaction() {
  return function (dispatch) {
    axiosInstance({
      method: 'GET',
      url: '/transactions',
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then((response) => {
        dispatch({ type: "GET_ALL_TRANSACTION", payload: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function fetchReport() {
  return function (dispatch) {
    axiosInstance({
      method: 'GET',
      url: '/reports',
      headers: {
        access_token: localStorage.access_token
      }
    })
      .then((response) => {
        dispatch({ type: "GET_ALL_REPORT", payload: response.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export function postReport(payload) {
  return function (dispatch) {
    axiosInstance({
      method: 'POST',
      url: '/reports',
      headers: {
        access_token: localStorage.access_token
      },
      data: payload
    })
      .then((response) => {
        dispatch(fetchReport())
      })
      .catch((err) => {
        console.log(err)
      })
  }
}