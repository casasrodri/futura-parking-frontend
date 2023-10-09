<template>
    <section id="mensajes">
        <br>
        <h2 class="block">MENSAJES</h2>
        <div v-if="conversacionesRelacionadas.length > 0">
            <template v-for="conversacion in conversacionesRelacionadas" :key="conversacion._id">
                <RouterLink :to="{ path: '/conversaciones/' + conversacion._id }">
                    <div>
                        {{ conversacion.nombre }}
                        <span v-if="conversacion.mensajes_nuevos">
                            ({{ conversacion.mensajes_nuevos }} mensajes nuevos)
                        </span>
                    </div>
                </RouterLink>
            </template>
        </div>

        <div v-else>
            <div v-if="esCreador"><!-- Vista del CREADOR -->
                <div v-if="conversacionesRelacionadas.length === 0">
                    Aún no hay mensajes...
                </div>

            </div>
            <div v-else> <!-- Vista del INTERESADO -->
                <a @click="crearChat">
                    Contactar por esta publicación
                </a>
            </div>
        </div>
    </section>
</template>

<script setup>


import Conversacion from '../api/conversaciones.js'
import localUser from '../utils/localUser.js';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const route = useRoute()
const router = useRouter()
const conversacionesRelacionadas = ref([])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
    esCreador: Boolean,
})

onMounted(() => {
    obtenerConversaciones()
})

const obtenerConversaciones = async () => {
    console.log('Obteniendo conversaciones...')
    const res = await Conversacion.obtenerPorPublicacion(route.params.id)
    const conversaciones = res.data
    const relac = []

    for (const conversacion of conversaciones) {
        const conv = await procesarConversacionAsociada(conversacion)
        relac.push(conv)
    }

    conversacionesRelacionadas.value = relac
}

const procesarConversacionAsociada = async (conversacion) => {
    const conv = { _id: conversacion._id }

    if (conversacion.demandante._id === localUser().id) {
        conv.nombre = conversacion.oferente.nombre + ' ' + conversacion.oferente.apellido
    } else {
        conv.nombre = conversacion.demandante.nombre + ' ' + conversacion.demandante.apellido
    }

    // Buscar los mensajes no leídos
    const res = await Conversacion.contarMensajesNoLeidos(conversacion._id, localUser().id)
    conv.mensajes_nuevos = res.data.length

    return conv
}

const crearChat = async () => {
    const publicacion = props.publicacion

    const datos = {
        publicacion: publicacion.value._id,
        tipo: publicacion.value.tipo,
        demandante: publicacion.value.tipo === 'demanda' ? publicacion.value.creador._id : localUser().id,
        oferente: publicacion.value.tipo === 'demanda' ? localUser().id : publicacion.value.creador._id,
    }
    console.log(datos)

    const res = await Conversacion.create(datos)
    console.log(res.data)

    router.push({ path: '/conversaciones/' + res.data._id })
}


</script>
