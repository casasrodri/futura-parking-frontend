import backend from '../api/backend.js'

export const get = (path) => {
  return backend.get(path)
}

export const post = (path, obj) => {
  return backend.post(path, obj)
}

export const put = (path, obj) => {
  return backend.put(path, obj)
}

export const del = (path) => {
  return backend.delete(path)
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
