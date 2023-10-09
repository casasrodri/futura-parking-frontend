<template>
    <section id="infoPublicacion">

        <h2 class="block">VISTA DE PUBLICACION</h2>

        <div id="tarjeta-datos">
            <i>* Tipo:</i> {{ publicacion.tipo }}<br>
            <i>* Estado:</i> {{ publicacion.estado }}<br>
            <i>* Observaciones:</i> {{ publicacion.observaciones }}<br>
            <i>* Inicio:</i> {{ fechaHoraISO(publicacion.ini) }}<br>
            <i>* Fin:</i> {{ fechaHoraISO(publicacion.fin) }}<br>
            <i>* Creador:</i> {{ publicacion.creador.nombre }} {{ publicacion.creador.apellido }}<br>
            <span v-if="publicacion.vehiculo">
                <i>* Vehículo: </i>
                <RouterLink :to="{ path: '/vehiculos/' + publicacion.vehiculo._id }">
                    {{ publicacion.vehiculo.alias }} ({{ publicacion.vehiculo.patente }})
                </RouterLink>
                <br>
            </span>

            <span v-if="publicacion.cochera">
                <i>* Cochera: </i>
                <RouterLink :to="{ path: '/cocheras/' + publicacion.cochera._id }">
                    {{ publicacion.cochera.numero }} ({{ publicacion.cochera.tipo }})
                </RouterLink>
                <br>
            </span>

            <div v-if="esCreador">
                <br>
                <RouterLink :to="{ path: '/publicaciones/editar/' + publicacion._id }">
                    Editar
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { fechaHoraISO } from '../utils/formats.js'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
    esCreador: Boolean,
})

</script>
