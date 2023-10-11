<template>
    <section id="mensajes" class="mx-2 mt-4">
        <h2 class="bloc underline text-xl">Mensajes</h2>

        <div v-if="conversacionesRelacionadas.length > 0">

            <CardMensaje v-for="conversacion in conversacionesRelacionadas" :key="conversacion._id"
                :nombre="conversacion.nombre" :cantidad="conversacion.mensajes_nuevos" :idConversacion="conversacion._id" />
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

import CardMensaje from './CardMensaje.vue';

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
        publicacion: publicacion._id,
        tipo: publicacion.tipo,
        demandante: publicacion.tipo === 'demanda' ? publicacion.creador._id : localUser().id,
        oferente: publicacion.tipo === 'demanda' ? localUser().id : publicacion.creador._id,
    }
    console.log(datos)

    const res = await Conversacion.create(datos)
    console.log(res.data)

    router.push({ path: '/conversaciones/' + res.data._id })
}


</script>
