<template>
    <PubliDetalles :publicacion="publicacion" :esCreador="esCreador" />
    <PubliMensajes :publicacion="publicacion" :esCreador="esCreador" />
    <PubliRecomendaciones :publicacion="publicacion" />
</template>

<script setup>

import PubliDetalles from '../../components/PubliDetalles.vue';
import PubliMensajes from '../../components/PubliMensajes.vue';
import PubliRecomendaciones from '../../components/PubliRecomendaciones.vue';
import { ref, onMounted, watch } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import { useRoute } from 'vue-router';
import localUser from '../../utils/localUser.js';

const publicacion = ref({ creador: {}, vehiculo: {} })
const esCreador = ref(false)
const route = useRoute()

const actualizarComponente = async () => {
    const res = await Publicacion.get(route.params.id);
    publicacion.value = res.data

    const creadorPubli = publicacion.value.creador._id
    esCreador.value = creadorPubli === localUser().id
}

onMounted(async () => {
    actualizarComponente()
});

watch(
    () => route.params.id,
    async () => {
        if (route.name === 'publicacionesView') actualizarComponente()
    }
)

</script>
