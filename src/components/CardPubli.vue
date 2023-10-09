<template>
    <div class="card">
        <RouterLink :to="{ path: '/publicaciones/ver/' + publicacion._id }">
            <div class="titulo">
                <template v-if="propia">
                    <!-- {{ capitalizar(publicacion.tipo) }} -->
                    <!-- {{ publicacion.tipo === 'oferta' ? 'Ofrezco' : 'Busco' }} -->
                    {{ publicacion.tipo === 'oferta' ? 'Me alquilás?' : 'Te alquilo!' }}
                </template>
                <template v-else-if="publicacion.tipo === 'demanda'">
                    {{ capitalizar(publicacion.vehiculo.tipo) }}
                </template>
                <template v-else>
                    {{ capitalizar(publicacion.cochera.tipo) }}
                </template>
            </div>

            <div class="periodo">
                {{ fecha(publicacion.ini) }} {{ hora(publicacion.ini) }} -> {{ fecha(publicacion.fin) }} {{
                    hora(publicacion.fin) }}
            </div>

            <div class="publicador">
                <template v-if="propia && publicacion.tipo === 'oferta'">
                    {{ publicacion.cochera.numero }} ({{ publicacion.cochera.tipo }})
                </template>
                <template v-else>
                    {{ publicacion.creador.nombre }} {{ publicacion.creador.apellido }}
                </template>

            </div>
        </RouterLink>
    </div>
</template>

<script setup>
import { fecha, hora, capitalizar } from '../utils/formats.js';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
    propia: Boolean,
})
</script>

<style>
.contenedor {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    /* Hacemos que los sub-divs se comporten como flex-items */
    justify-content: space-between;
    /* Distribuye el espacio entre los sub-divs */
    width: 100%;
    /* Ocupa todo el ancho disponible */
}

/* Estilos para los sub-divs */
.subdiv {
    flex: 1;
    /* Cada sub-div ocupará la mitad del espacio disponible */
    display: flex;
    /* Hacemos que el texto se centre verticalmente */
    align-items: center;
    /* Centramos el contenido verticalmente */
    justify-content: center;
    /* Centramos el contenido horizontalmente */
    border: 1px solid #000;
    /* Añadimos un borde para visualizar los sub-divs */
    text-align: center;
    /* Centramos el texto horizontalmente */
}

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

.periodo {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
}

.publicador {
    font-size: 15px;
    font-weight: bold;
    text-align: center;
}
</style>
