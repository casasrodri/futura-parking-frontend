<template>
    <footer class="fixed left-0 right-0 bottom-0 pb-2 rounded-md shadow-lg bg-white flex place-content-center">
        <!-- {{ btnActivo }} -->
        <div class="grid grid-cols-5 gap-4 md:gap-4 pl-2 max-w-sm min-w-sm">

            <RouterLink :to="{ name: 'vehiculosList' }">
                <BotonBarraInferior icono="car-front-fill" :seleccionado="btnActivo.vehiculos"
                    @click="apretarBtn('vehiculos')" />
            </RouterLink>

            <RouterLink :to="{ name: 'cocherasList' }">
                <BotonBarraInferior icono="p-square" :seleccionado="btnActivo.cocheras" @click="apretarBtn('cocheras')" />
            </RouterLink>

            <RouterLink :to="{ name: 'publicacionesList', params: { tipoPub: 'ofertas', tipoVis: 'otros' } }">
                <BotonBarraInferior icono="copy" :seleccionado="btnActivo.publicaciones"
                    @click="apretarBtn('publicaciones')" />
                <!-- collection -->
                <!-- newspaper -->
            </RouterLink>

            <RouterLink :to="{ name: 'conversacionesList' }">
                <!-- FIXME transaccionesList -->
                <BotonBarraInferior icono="clock-history" :seleccionado="btnActivo.historial"
                    @click="apretarBtn('historial')" />
            </RouterLink>

            <RouterLink :to="{ name: 'conversacionesList' }">
                <BotonBarraInferior icono="envelope" :seleccionado="btnActivo.mensajes" @click="apretarBtn('mensajes')"
                    @notificaciones="contarMensajesSinLeer" />
            </RouterLink>

        </div>

        <div v-if="conteoGeneral"
            class="relative inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-600 rounded-full right-4 top-2">
            {{ conteoGeneral }}
        </div>
    </footer>

    <!-- {{ $route }} -->
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BotonBarraInferior from './BotonBarraInferior.vue';
import Conversacion from '../api/conversaciones.js';
import localUser from '../utils/localUser.js';

const route = useRoute()
const router = useRouter()

const btnActivo = ref({
    publicaciones: true
})

function deseleccionarTodo() {
    Object.keys(btnActivo.value).forEach(prop => {
        btnActivo.value[prop] = false;
    });
}

function apretarBtn(boton) {
    deseleccionarTodo();
    btnActivo.value[boton] = true;
}

onMounted(() => {
    analizarRuta()

    // FIXME Delegarle el conteo al backend, ver si se pueden poner sockets

    setInterval(() => {
        contarMensajesSinLeer()
    }, 60 * 1000)
})

function analizarRuta() {
    const path = route.fullPath.toLowerCase()
    if (path.includes('vehiculos')) {
        apretarBtn('vehiculos')
    } else if (path.includes('cocheras')) {
        apretarBtn('cocheras')
    } else if (path.includes('publicaciones')) {
        apretarBtn('publicaciones')
    } else if (path.includes('conversaciones')) {
        apretarBtn('mensajes')
    } else if (path.includes('transacciones')) {
        apretarBtn('historial')
    } else if (path === '/') {
        deseleccionarTodo();
    }
}

watch(route, async () => {
    analizarRuta()
})

const conteoGeneral = ref(0)
async function contarMensajesSinLeer() {
    const miUsuario = localUser().id
    const { data } = await Conversacion.obtenerDelUsuario(miUsuario)

    let suma = 0

    for (const conversacion of data) {
        const { data: noLeidos } = await Conversacion.contarMensajesNoLeidos(conversacion._id, miUsuario)
        suma += noLeidos.length
    }

    conteoGeneral.value = suma
}
</script>
