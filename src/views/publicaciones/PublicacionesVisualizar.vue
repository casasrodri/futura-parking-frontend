<template>
    <div id="selectores" class="flex gap-1 p-1 mx-auto max-w-full my-2 items-center justify-between">

        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-50 rounded-lg" role="group">
            <RouterLink :to="{ name: 'publicacionesOfertas' }"
                :class="'text-center px-5 py-1.5 text-xs font-medium rounded-lg ' + estilos.oferta">
                Necesito
            </RouterLink>

            <RouterLink :to="{ name: 'publicacionesPedidos' }"
                :class="'text-center px-5 py-1.5 text-xs font-medium rounded-lg ' + estilos.demanda">
                Ofrezco
            </RouterLink>
        </div>

        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-50 rounded-lg" role="group">
            <RouterLink :to="{ name: 'publicacionesOfertas' }"
                :class="'text-center px-3 py-1.5 text-xs font-medium rounded-lg ' + estilos.oferta">
                <i class="bi bi-people-fill"></i>
            </RouterLink>

            <RouterLink :to="{ name: 'publicacionesPedidos' }"
                :class="'text-center px-3 py-1.5 text-xs font-medium rounded-lg ' + estilos.demanda">
                <i class="bi bi-person-fill"></i>
            </RouterLink>
        </div>
    </div>

    <div id="cards" class="ml-1 px-2">

        <CardNuevo />

        <template v-for="publi in publicaciones" :key="publi._id">
            <CardPubli :publicacion="publi" />
        </template>
    </div>
</template>

<script setup>

// /publicaciones/ofertas/mias
// /publicaciones/ofertas/otros
// /publicaciones/demandas/mias
// /publicaciones/demandas/otros

import { ref, onMounted, watch } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import { useRoute } from 'vue-router';
import CardPubli from '../../components/CardPubli.vue';
import CardNuevo from '../../components/CardNuevo.vue';
import localUser from '../../utils/localUser.js';

const route = useRoute()
const publicaciones = ref()

const estilos = ref({
    oferta: true,
    demanda: false
})

const getPublicaciones = async (tipo) => {
    const { data } = await Publicacion.obtenerDisponibles(tipo);
    const sinUsuario = data.filter(publi => publi.creador._id !== localUser().id)
    publicaciones.value = sinUsuario
}

const mostrarPublicaciones = () => {
    if (route.name === 'publicacionesPedidos') {
        getPublicaciones('demanda')
        estilos.value.oferta = 'text-gray-800'
        estilos.value.demanda = 'text-white bg-jade-600'
    } else {
        getPublicaciones('oferta')
        estilos.value.oferta = 'text-white bg-jade-600'
        estilos.value.demanda = 'text-gray-800'
    }
}

onMounted(async () => {
    mostrarPublicaciones()
});

watch(route, () => {
    mostrarPublicaciones()
})

</script>
