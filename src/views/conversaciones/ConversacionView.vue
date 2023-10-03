<template>
    <div v-if="datosConversacion.mostrar">
        <!-- {{ datosConversacion }} -->
        <br>
        <i>* Publicación: </i>
        <RouterLink :to="{ path: '/publicaciones/ver/' + datosConversacion.publicacion._id }">
            {{ datosConversacion.publicacion._id }}<br>
        </RouterLink>
        <i>* Oferente:</i> {{ datosConversacion.oferente.nombre }}<br>
        <i>* Demandante:</i> {{ datosConversacion.demandante.nombre }}<br>

        <br>
        <h2>MENSAJES</h2>
        <ul>
            <li v-for="mensaje in mensajes">
                {{ mensaje }}
            </li>
        </ul>

        <br>
        {{ mostrarEscribiendo }}

        <br>
        <input type="text" v-model="mensaje" @input="escribiendo">
        <button @click="enviarMensaje">Enviar</button>


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Conversacion from '../../api/conversaciones.js';

const routes = useRoute()
const datosConversacion = ref({})
const mensaje = ref('')

import { URL } from '../../api/index.js'
import io from 'socket.io-client';
const socket = io(URL);

import { getSessionInfo } from '../../api/sesiones.js';
const sessionInfo = ref({})

onMounted(async () => {
    const res = await Conversacion.get(routes.params.id)
    datosConversacion.value = res.data
    datosConversacion.value.mostrar = true

    const res2 = await getSessionInfo()
    sessionInfo.value = res2
})


const mensajes = ref([])
const enviarMensaje = () => {
    socket.emit('newMessage', datosConversacion.value.publicacion._id, sessionInfo.value.usuario, mensaje.value);
    mensaje.value = ''
}

socket.on('avisoDelServer', (mensaje) => {
    mensajes.value.push(mensaje)
})


const usuariosEscribiendo = ref({})
const mostrarEscribiendo = ref([])

socket.on('mostrarEscribiendo', (pub, usuario, i) => {
    if (pub === datosConversacion.value.publicacion._id) {
        usuariosEscribiendo.value[usuario] = usuariosEscribiendo.value[usuario] || 0
        usuariosEscribiendo.value[usuario] += i
    }

    let usuarios = ''
    Object.keys(usuariosEscribiendo.value).forEach((usuario) => {
        if (usuariosEscribiendo.value[usuario] > 0) {
            usuarios += usuario + ' está escribiendo...'
        }
    })

    mostrarEscribiendo.value = usuarios
})

const escribiendo = () => {
    const publicacion = datosConversacion.value.publicacion._id
    const usuario = sessionInfo.value.nombre

    socket.emit('escribiendo', publicacion, usuario);
    setTimeout(() => {
        socket.emit('noEscribiendo', publicacion, usuario);
    }, 1000);
}

</script>
