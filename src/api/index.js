import axios from 'axios'
import Cookies from '../utils/cookies.js'

export const PORT = import.meta.env['VITE_API_PORT'] || 8080
export const URL = import.meta.env['VITE_API_URL'] || `http://${window.location.hostname}:${PORT}`

const LOG_DETALLADO = import.meta.env['VITE_LOG_AXIOS'] === '1' || false

const api = axios.create({
  baseURL: URL
})

export const getConfig = () => {
  return {
    headers: { Authorization: Cookies.get('jwt') }
  }
}

export const get = (path) => {
  if (LOG_DETALLADO) console.log('[Axios] GET: ' + URL + path)
  return axios.get(URL + path, getConfig())
}

// import router from '../router'

// export const get = async (path) => {
//   if (LOG_DETALLADO) console.log('[Axios] GET: ' + URL + path)
//   try {
//     return await axios.get(URL + path, getConfig())
//   } catch (error) {
//     const status = error.response.status
//     const mensaje = error.response.data.mensaje

//     if (status === 401 && mensaje === 'Token inválido') {
//       localStorage.removeItem('jwt')
//       router.push('/ingreso')
//       console.log('El token es inválido, se intentará renovar.')
//     }
//   }
// }

export const post = (path, body) => {
  if (LOG_DETALLADO) console.log('[Axios] POST: ' + URL + path, body)
  return axios.post(URL + path, body, getConfig())
}

export const put = (path, body) => {
  if (LOG_DETALLADO) console.log('[Axios] PUT: ' + URL + path, body)
  return api.put(path, body, getConfig())
}

export const del = (path) => {
  if (LOG_DETALLADO) console.log('[Axios] DELETE: ' + URL + path)
  return axios.delete(URL + path, getConfig())
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
