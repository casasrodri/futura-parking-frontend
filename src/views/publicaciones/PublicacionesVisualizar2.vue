<template>
    <SelectorPubli />
    <!-- {{ $route.params }} -->
    <div class="max-w-lg mx-auto w-full px-2 py-2">

        <template v-for="publi in publicaciones" :key="publi._id">
            <CardPubli :publicacion="publi" />
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
const publicaciones = ref()

const getPublicaciones = async () => {
    let renderizar

    if (route.params.tipoVis === 'mias') {
        const tipoPub = route.params.tipoPub === 'ofertas' ? 'demanda' : 'oferta'
        const { data } = await Publicacion.obtenerDisponibles(tipoPub);
        renderizar = data.filter(publi => publi.creador._id === localUser().id)
    } else {
        const tipoPub = route.params.tipoPub === 'ofertas' ? 'oferta' : 'demanda'
        const { data } = await Publicacion.obtenerDisponibles(tipoPub);
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
