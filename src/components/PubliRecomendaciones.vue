<template>
    <section id="recomendaciones" class="mx-2 mt-4">
        <h2 class="bloc underline text-xl">Publicaciones recomendadas</h2>

        <template v-if="recomendadas.length > 0">
            <template v-for="recom in  recomendadas " :key="recom._id">
                <template v-if="recom.creador._id != publicacion.creador._id">
                    <CardPubli :publicacion="recom" :propia="false" />
                </template>
            </template>
        </template>

        <template v-else>
            <div class="text-gray-500 mt-1">
                No hay recomendaciones para esta publicación.
            </div>
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

    const filtrado = resRecomendadas.data.filter((recom) => {
        return recom.creador._id != props.publicacion.creador._id
    })

    recomendadas.value = filtrado
}
</script>
