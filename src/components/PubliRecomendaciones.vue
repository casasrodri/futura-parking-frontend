<template>
    <section id="recomendaciones">

        <br>
        <h2 class="block">RECOMENDACIONES</h2>
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
                    <RouterLink :to="{ path: '/publicaciones/ver/' + recom._id }">
                        <!-- {{ recom }} -->
                        <template v-if="recom.tipo === 'oferta'">
                            {{ recom.cochera.tipo }}
                        </template>
                        <template v-else>
                            tipo: {{ recom.vehiculo.tipo }}
                        </template>
                        <br>
                        fecha: {{ recom.ini }} - {{ recom.fin }}
                        <br>
                        usuario: {{ recom.creador.nombre }} {{ recom.creador.apellido }}
                        <br>
                        porcentaje: {{ round(recom.similitud * 100) }} %
                    </RouterLink>
                    <hr>
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
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const recomendadas = ref([])

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
})

onMounted(() => {
    obtenerPublRecomendadas()
})

const round = (number) => {
    const roundedNumber = Math.round(number * 100) / 100;
    const formattedNumber = roundedNumber.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formattedNumber;
}

const obtenerPublRecomendadas = async () => {
    const resRecomendadas = await Publicacion.obtenerRecomendaciones(route.params.id);
    recomendadas.value = resRecomendadas.data
}
</script>
