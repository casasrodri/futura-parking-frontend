export default () => {
  return {
    id: localStorage.getItem('id'),
    nombre: localStorage.getItem('nombre'),
    token: localStorage.getItem('jwt')
  }
}
