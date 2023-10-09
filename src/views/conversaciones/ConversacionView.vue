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
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <li v-for="mensaje in mensajesEntreUsuarios">
                {{ mensaje }}
            </li>

        </ul>

        <br>
        {{ mostrarEscribiendo }}

        <br>
        <input type="text" v-model="mensaje" @input="escribiendo" @change="enviarMensaje">
        <button @click="enviarMensaje">Enviar</button>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Conversacion from '../../api/conversaciones.js';

const routes = useRoute()
const datosConversacion = ref({})
const mensaje = ref('')

import { URL } from '../../api/index.js'
import io from 'socket.io-client';
const socket = io(URL);

import localUser from '../../utils/localUser.js';

onMounted(async () => {
    const res = await Conversacion.get(routes.params.id)
    datosConversacion.value = res.data
    datosConversacion.value.mostrar = true

    socket.emit('unirseChat', routes.params.id);
})

onBeforeUnmount(() => {
    socket.disconnect();
})


const mensajesEntreUsuarios = ref([])
const enviarMensaje = () => {
    if (mensaje.value === '') return
    socket.emit(
        'crearMensaje',
        routes.params.id,
        localUser().id,
        mensaje.value
    )
    mensaje.value = ''
}

const renderizarMensaje = (mensaje) => {
    mensajesEntreUsuarios.value.push(`${mensaje.usuario.nombre}: ${mensaje.mensaje}`)
}

socket.on('todosMensajes', (mensajes) => {
    // console.log('## Se ejecutó el evento **todosMensajes**')
    mensajes.forEach(mensaje => {
        socket.emit('marcarLeido', mensaje._id, localUser().id)
        renderizarMensaje(mensaje)
    })
})

socket.on('nuevoMensaje', (mensaje) => {
    socket.emit('marcarLeido', mensaje._id, localUser().id)
    renderizarMensaje(mensaje)
})


// eslint-disable-next-line no-unused-vars
socket.on('leido', async (mensaje_id, usuario_id) => {
    // console.log(`El server notifica que el usuario ${usuario_id} ha leido el mensaje ${mensaje_id}.`)
})


const usuariosEscribiendo = ref({})
const mostrarEscribiendo = ref('')

socket.on('mostrarEscribiendo', (usuario, i) => {
    let usuarios = ''

    if (usuario === localUser().nombre) return

    usuariosEscribiendo.value[usuario] = usuariosEscribiendo.value[usuario] || 0
    usuariosEscribiendo.value[usuario] += i

    Object.keys(usuariosEscribiendo.value).forEach((usuario) => {
        if (usuariosEscribiendo.value[usuario] > 0) {
            usuarios += usuario + ' está escribiendo...'
        }
    })

    mostrarEscribiendo.value = usuarios
})

const escribiendo = () => {
    const conversacion = routes.params.id
    const usuario = localUser().nombre

    socket.emit('escribiendo', conversacion, usuario);
    setTimeout(() => {
        socket.emit('noEscribiendo', conversacion, usuario);
    }, 1000);
}



</script>
