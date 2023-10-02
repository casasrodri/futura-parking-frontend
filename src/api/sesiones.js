import { get, post } from './index.js'

export const checkLogged = async () => {
  const infoSesion = await get('/api/sesiones')
  console.log(infoSesion.data)
  return infoSesion.data.isLogged
}

export const login = async (email, password) => {
  return await post('/api/sesiones/login', { email, password })
}
