import CRUD from './index.js'
import { get } from './index.js'

class ConversacionAPI extends CRUD {
  async obtenerPorPublicacion(id) {
    const conversaciones = await get(this.path + '/porPublicacion/' + id)
    return conversaciones
  }

  async contarMensajesNoLeidos(chatId, userId) {
    const mensajes = await get(`${this.path}/${chatId}/mensajesNoLeidos/usuario/${userId}`)
    return mensajes
  }
}

export default new ConversacionAPI('/api/conversaciones')
