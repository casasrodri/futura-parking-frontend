<template>
    <div class="contenedor">
        <div class="subdiv">
            <RouterLink :to="{ name: 'publicacionesOfertas' }">
                <p>Ofertas</p>
            </RouterLink>
        </div>
        <div class="subdiv">
            <RouterLink :to="{ name: 'publicacionesPedidos' }">
                <p>Pedidos</p>
            </RouterLink>
        </div>
    </div>

    <template v-for="publi in publicaciones" :key="publi._id">
        <CardPubli :publicacion="publi" />
    </template>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import { getSessionInfo } from '../../api/sesiones.js';
import { useRoute } from 'vue-router';
import CardPubli from '../../components/CardPubli.vue';

const route = useRoute()
const publicaciones = ref()
const usuarioLogged = ref()

const getPublicaciones = async (tipo) => {
    const { data } = await Publicacion.obtenerDisponibles(tipo);
    const sinUsuario = data.filter(publi => publi.creador._id !== usuarioLogged.value)
    publicaciones.value = sinUsuario
}

onMounted(async () => {
    const { usuario } = await getSessionInfo()
    usuarioLogged.value = usuario

    getPublicaciones('oferta')
});

watch(route, () => {
    if (route.name === 'publicacionesPedidos')
        getPublicaciones('demanda')
    else
        getPublicaciones('oferta')
})

</script>
