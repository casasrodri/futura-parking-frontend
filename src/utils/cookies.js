export function setCookie(clave, valor, expira = '') {
  let expiracion
  if (expira !== '') {
    expiracion = 'expires=' + new Date(expira).toUTCString()
  }

  document.cookie = `${clave}=${valor}; ${expiracion}; path=/`
}

export function getAllCookies() {
  const todas = document.cookie
  const parseCookie = todas.split('; ')
  const cookies = {}

  for (const c of parseCookie) {
    const cortado = c.split('=')
    cookies[cortado[0]] = cortado[1]
  }

  return cookies
}

export function getCookie(clave) {
  const todas = getAllCookies()
  return todas[clave]
}

export function deleteCookie(clave) {
  setCookie(clave, '', '2000-01-01 00:00:00')
}
