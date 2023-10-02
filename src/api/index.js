import axios from 'axios'

const PORT = 8080
const isLocalhost =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const URL = isLocalhost ? `http://localhost:${PORT}` : `http://${window.location.hostname}:${PORT}`
const LOG_DETALLADO = true

const api = axios.create({
  baseURL: URL
})

export const get = (path) => {
  if (LOG_DETALLADO) console.log('[Axios] GET: ' + URL + path)
  return axios.get(URL + path)
}

export const post = (path, obj) => {
  if (LOG_DETALLADO) console.log('[Axios] POST: ' + URL + path, obj)
  return axios.post(URL + path, obj)
}

export const put = (path, obj) => {
  if (LOG_DETALLADO) console.log('[Axios] PUT: ' + URL + path, obj)
  return api.put(path, obj)
}

export const del = (path) => {
  if (LOG_DETALLADO) console.log('[Axios] DELETE: ' + URL + path)
  return axios.delete(URL + path)
}

export default class CRUD {
  constructor(path) {
    this.path = path
  }

  async getAll() {
    return await get(this.path)
  }

  async get(id) {
    return await get(`${this.path}/${id}`)
  }

  async create(obj) {
    return await post(this.path, obj)
  }

  async update(id, obj) {
    return await put(`${this.path}/${id}`, obj)
  }

  async delete(id) {
    return await del(`${this.path}/${id}`)
  }
}
