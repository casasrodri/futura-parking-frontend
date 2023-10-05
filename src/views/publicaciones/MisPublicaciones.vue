<template>
    <div>
        <div class="card">
            <RouterLink :to="{ name: 'publicacionesAlta' }">
                <div class="titulo">
                    +
                </div>
                <div class="publicador">
                    Nueva
                </div>
            </RouterLink>
        </div>

        <div v-for="publi in publicaciones" :key="publi._id">
            <!-- {{ publi }} -->
            <CardPubli :publicacion="publi" :propia="true" />
        </div>
    </div>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import { getSessionInfo } from '../../api/sesiones.js';
import CardPubli from '../../components/CardPubli.vue';

const publicaciones = ref([])
const usuarioLogged = ref()

onMounted(async () => {
    const { usuario } = await getSessionInfo()
    usuarioLogged.value = usuario

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

    const soloUsuario = todasPublicaciones.filter(publi => publi.creador._id === usuarioLogged.value)

    publicaciones.value = soloUsuario
}

</script>

<style>
.card {
    border: 1px solid #918383;
    border-radius: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
}

.titulo {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

.publicador {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
}
</style>
