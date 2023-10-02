import axios from 'axios'
import URL from '../api/backend.js'

export const get = (path) => {
  return axios.get(URL + path)
}

export const post = (path, obj) => {
  return axios.post(URL + path, obj)
}

export const put = (path, obj) => {
  return axios.put(path, obj)
}

export const del = (path) => {
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
