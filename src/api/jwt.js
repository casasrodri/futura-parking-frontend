import { post } from './index.js'

export const login = async (email, password) => {
  try {
    const {
      data: { id, nombre, token }
    } = await post('/api/jwt/login', { email, password })

    localStorage.setItem('id', id)
    localStorage.setItem('nombre', nombre)
    localStorage.setItem('jwt', token)
  } catch (e) {
    console.log('Ocurrió un error en el login: ' + e.response.data.error)
    return false
  }

  return true
}
