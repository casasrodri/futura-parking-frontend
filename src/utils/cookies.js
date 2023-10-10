export default class Cookies {
  static set(clave, valor, expira = '') {
    let expiracion
    if (expira !== '') {
      expiracion = 'expires=' + new Date(expira).toUTCString()
    }

    document.cookie = `${clave}=${valor}; ${expiracion}; path=/`
  }

  static getAll() {
    const todas = document.cookie
    const parseCookie = todas.split('; ')
    const cookies = {}

    for (const c of parseCookie) {
      const cortado = c.split('=')
      cookies[cortado[0]] = cortado[1]
    }

    return cookies
  }

  static get(clave) {
    const todas = this.getAll()
    return todas[clave]
  }

  static delete(clave) {
    this.set(clave, '', '2000-01-01 00:00:00')
  }
}
