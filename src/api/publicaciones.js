import CRUD from './index.js'
import { get } from './index.js'

class PublicacionesAPI extends CRUD {
  async obtenerDisponibles(tipo) {
    const publicaciones = await get(this.path + '/disponibles/' + tipo)
    return publicaciones
  }
}

export default new PublicacionesAPI('/api/publicaciones')
