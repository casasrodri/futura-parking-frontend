<template>
    <div v-if="datosConversacion.mostrar" class="mx-2 mt-2">
        <div>
            <span class="font-medium">
                Publicación:
            </span>
            <RouterLink :to="{ path: '/publicaciones/ver/' + datosConversacion.publicacion._id }">
                <span class="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                    <span class="text-gray-500">
                        #
                    </span>
                    {{ datosConversacion.publicacion._id.slice(-4) }}
                </span>
            </RouterLink>
        </div>

        <div>
            <span class="font-medium">
                Oferente:
            </span>
            {{ datosConversacion.oferente.nombre }} {{ datosConversacion.oferente.apellido }}
        </div>

        <div>
            <span class="font-medium">
                Demandante:
            </span>
            {{ datosConversacion.demandante.nombre }} {{ datosConversacion.demandante.apellido }}
        </div>


        <div id="zona-mensajes" class="sector-chat overflow-y-auto bg-jade-50 mt-3" ref="scrollContainer">
            <template v-for="mensaje in mensajesEntreUsuarios" :key="mensaje._id">
                <MensajeChat :msj="mensaje" />
            </template>
        </div>
    </div>



    <div id="zona-escritura" class="bottom-16 fixed max-w-full w-full flex flex-col mb-4">

        <span class="text-gray-600 text-xs ml-2">
            {{ mostrarEscribiendo }}
        </span>

        <div id="zona-escritura" class="max-w-full w-full flex flex-row">
            <input type="text" v-model="mensaje" @input="escribiendo" @change="enviarMensaje"
                class="bg-jade-50 border border-jade-300 text-gray-800 text-sm rounded-lg focus:ring-jade-300 focus:border-jade-300 block w-full p-2.5 mr-2 ml-2">

            <button type="button" @click="enviarMensaje"
                class="text-white bg-jade-700 hover:bg-jade-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2">
                <i class="bi bi-send mr-2"></i>
                Enviar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import Conversacion from '../../api/conversaciones.js';
import MensajeChat from '../../components/MensajeChat.vue';

const routes = useRoute()
const datosConversacion = ref({})
const mensaje = ref('')
const scrollContainer = ref(null);


const scrollToBottom = () => {
    if (scrollContainer.value) {
        setTimeout(() => {
            scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
        }, 100)
    }
};

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
    // console.log(mensaje)
    mensajesEntreUsuarios.value.push(mensaje)
    scrollToBottom()
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

<style>
.max-h-40 {
    max-height: 32rem;
    /* Establece la altura máxima en píxeles o en la unidad deseada */
}

.sector-chat {
    height: calc(100vh - 275px);
    /* Resta 100px del alto de la pantalla */
    background-color: #f0f0f0;
}
</style>
