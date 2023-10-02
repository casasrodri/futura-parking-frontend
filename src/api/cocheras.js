import CRUD from './index.js'
import { get } from './index.js'

class CocheraAPI extends CRUD {
  async obtenerPorPropietario(id) {
    const cocheras = await get(this.path + '/propietario/' + id)
    return cocheras
  }

  async obtenerDelPropietario() {
    const cocheras = await get(this.path + '/delPropietario')
    return cocheras
  }
}

export default new CocheraAPI('/api/cocheras')
