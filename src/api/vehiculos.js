import CRUD from './index.js'
import { get } from './index.js'

class VehiculoAPI extends CRUD {
  async obtenerPorPropietario(id) {
    const vehiculos = await get(this.path + '/propietario/' + id)
    return vehiculos
  }

  async obtenerDelPropietario() {
    const vehiculos = await get(this.path + '/delPropietario')
    return vehiculos
  }
}

export default new VehiculoAPI('/api/vehiculos')
