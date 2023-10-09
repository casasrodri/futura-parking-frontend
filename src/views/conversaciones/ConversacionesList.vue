<template>
    <div v-for="conv in conversaciones" :key="conv._id">
        <RouterLink :to="{ path: `/conversaciones/${conv._id}` }">
            <div v-if="conv.oferente._id != localUser().id">
                Usuario: {{ conv.oferente.nombre }} {{ conv.oferente.apellido }}
            </div>
            <div v-if="conv.demandante._id != localUser().id">
                Usuario: {{ conv.demandante.nombre }} {{ conv.demandante.apellido }}
            </div>
            <div>
                Publicacion: ...{{ conv.publicacion._id.slice(-4) }}
            </div>
            <div>
                Mensajes no leídos: {{ conv.noLeidos }}
            </div>
        </RouterLink>
        <hr>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Conversacion from '../../api/conversaciones.js'
import localUser from '../../utils/localUser.js';

const conversaciones = ref()

onMounted(async () => {
    const miUsuario = localUser().id
    const { data } = await Conversacion.obtenerDelUsuario(miUsuario)

    // FIXME Me está trayendo todos los mensajes del chat
    for (const conversacion of data) {
        console.log(conversacion._id, miUsuario)
        const { data: noLeidos } = await Conversacion.contarMensajesNoLeidos(conversacion._id, miUsuario)
        conversacion.noLeidos = noLeidos.length
    }

    conversaciones.value = data
})

</script>
