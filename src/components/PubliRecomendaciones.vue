<template>
    <section id="recomendaciones" class="mx-2 mt-4">

        <h2 class="bloc underline text-xl">Publicaciones recomendadas</h2>
        <!--
Creador:
 - Le interesa ver las recomendadas menos las del usuario logueado
{{ recom.creador._id === localUser().id }}

Todos:
- Le interesa ver todas las publicaciones recomendadas (menos las del creador)
-->

        <template v-if="recomendadas.length > 0">
            <template v-for="recom in  recomendadas " :key="recom._id">
                <template v-if="recom.creador._id != publicacion.creador._id">
                    <CardPubli :publicacion="recom" :propia="false" />
                </template>
            </template>
        </template>

        <template v-else>
            No hay recomendaciones...
        </template>

    </section>
</template>

<script setup>
import Publicacion from '../api/publicaciones.js';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CardPubli from './CardPubli.vue';

const route = useRoute()
const recomendadas = ref([])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
})

onMounted(() => {
    obtenerPublRecomendadas()
})

const obtenerPublRecomendadas = async () => {
    const resRecomendadas = await Publicacion.obtenerRecomendaciones(route.params.id);
    recomendadas.value = resRecomendadas.data
}
</script>
