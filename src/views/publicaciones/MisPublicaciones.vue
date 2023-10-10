<template>
    <div>
        <CardNuevo />

        <div v-for="publi in publicaciones" :key="publi._id">
            <CardPubli :publicacion="publi" :propia="true" />
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import localUser from '../../utils/localUser.js';
import CardPubli from '../../components/CardPubli.vue';
import CardNuevo from '../../components/CardNuevo.vue';

const publicaciones = ref([])

onMounted(async () => {
    getPublicaciones()
});

const getPublicaciones = async () => {
    const { data: ofertas } = await Publicacion.obtenerDisponibles('oferta');
    const { data: demandas } = await Publicacion.obtenerDisponibles('demanda');
    const todasPublicaciones = [...ofertas, ...demandas]

    // Ordenan por fecha de publicación (descendente)
    todasPublicaciones.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    const soloUsuario = todasPublicaciones.filter(publi => publi.creador._id === localUser().id)
    publicaciones.value = soloUsuario
}

</script>
