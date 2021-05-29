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