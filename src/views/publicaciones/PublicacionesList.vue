<template>
    <SelectorPubli />
    <!-- {{ $route.params }} -->
    <!-- {{ publicaciones }} -->


    <div class="max-w-lg mx-auto w-full px-2 py-2">
        <template v-if="publicaciones.length === 0">
            <div class="text-center text-gray-600 mt-5">
                <span class="text-red-300">
                    <i class="bi bi-exclamation-circle-fill text-2xl"></i>
                </span>
                <p class="">No hay publicaciones disponibles</p>
            </div>
        </template>
        <template v-else>
            <template v-for="publi in publicaciones" :key="publi._id">
                <CardPubli :publicacion="publi" />
            </template>
        </template>
    </div>
</template>

<script setup>

import CardPubli from '../../components/CardPubli.vue';
import SelectorPubli from '../../components/SelectorPubli.vue';
import Publicacion from '../../api/publicaciones.js';
import localUser from '../../utils/localUser.js';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const publicaciones = ref([])

const getPublicaciones = async () => {
    let renderizar
    const tipoPub = route.params.tipoPub === 'ofertas' ? 'oferta' : 'demanda'
    const { data } = await Publicacion.obtenerDisponibles(tipoPub);

    if (route.params.tipoVis === 'mias') {
        renderizar = data.filter(publi => publi.creador._id === localUser().id)
    } else {
        renderizar = data.filter(publi => publi.creador._id !== localUser().id)
    }

    publicaciones.value = renderizar
}

onMounted(() => {
    getPublicaciones()
})

watch(route, () => {
    if (route.name === 'publicacionesList') {
        getPublicaciones()
    }
})


</script>
