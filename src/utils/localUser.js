import Cookies from './cookies.js'

export default () => {
  return {
    id: Cookies.get('id'),
    nombre: Cookies.get('nombre'),
    nombreCompleto: Cookies.get('nombreCompleto'),
    token: Cookies.get('jwt')
  }
}
