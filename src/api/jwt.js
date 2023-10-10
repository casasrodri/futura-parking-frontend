import { post } from './index.js'
import Cookies from '../utils/cookies.js'

export const login = async (email, password) => {
  try {
    const { data } = await post('/api/jwt/login', { email, password })

    Cookies.set('id', data.id, data.expira)
    Cookies.set('nombre', data.nombre, data.expira)
    Cookies.set('nombreCompleto', `${data.nombre} ${data.apellido}`, data.expira)
    Cookies.set('jwt', data.token, data.expira)
  } catch (e) {
    console.log('Ocurrió un error en el login: ' + e.response.data.error)
    return false
  }

  return true
}
