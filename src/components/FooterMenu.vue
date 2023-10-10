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
                <BotonBarraInferior icono="envelope" :seleccionado="btnActivo.mensajes" @click="apretarBtn('mensajes')" />
            </RouterLink>
        </div>
    </footer>

    <!-- {{ $route }} -->
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import BotonBarraInferior from './BotonBarraInferior.vue';

const route = useRoute()

const btnActivo = ref({
    publicaciones: true
})

function apretarBtn(boton) {
    Object.keys(btnActivo.value).forEach(prop => {
        btnActivo.value[prop] = false;
    });

    btnActivo.value[boton] = true;
}

watch(route, () => {
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
        apretarBtn('publicaciones')
    }
})
</script>
