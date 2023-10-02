import axios from 'axios'

const PORT = 8080
const isLocalhost =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const URL = isLocalhost ? `http://127.0.0.1:${PORT}` : `http://${window.location.hostname}:${PORT}`
axios.defaults.withCredentials = true

export default axios.create({
  baseURL: URL, // Replace with your API URL
  withCredentials: true // Send cookies with the request
})
