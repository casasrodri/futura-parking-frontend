<template>
    <a @click="atrasPag">◀ Atrás</a>
    <h2 class="block">VISTA DE PUBLICACION</h2>

    <div id="tarjeta-datos">
        <i>* Tipo:</i> {{ publicacion.tipo }}<br>
        <i>* Estado:</i> {{ publicacion.estado }}<br>
        <i>* Observaciones:</i> {{ publicacion.observaciones }}<br>
        <i>* Inicio:</i> {{ fechaHora(publicacion.ini) }}<br>
        <i>* Fin:</i> {{ fechaHora(publicacion.fin) }}<br>
        <i>* Vencimiento:</i> {{ fechaHora(publicacion.vencimiento) }}<br>
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

        <span v-if="publicacion.precio">
            <i>* Precio:</i> {{ publicacion.precio }}<br>
        </span>

        <div v-if="esCreador">
            <br>
            <RouterLink :to="{ path: '/publicaciones/editar/' + publicacion._id }">
                Editar
            </RouterLink>
        </div>
    </div>

    <!-- TODO -->
    <div v-if="!esCreador">
        % coincidencia: 88,90%
    </div>

    <h2 class="block">MENSAJES</h2>
    Aún no hay mensajes...

    <div v-if="!esCreador">
        <br>
        <a>Contactar</a>
    </div>

    <br>
    <br>
    <h2 class="block">PUBLICACIONES RELACIONADAS</h2>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import { useRoute, useRouter } from 'vue-router';

import { getSessionInfo } from '../../api/sesiones.js';

import { fechaHora } from '../../utils/datetime.js'


const publicacion = ref({ creador: {}, vehiculo: {} })
const esCreador = ref(false)
const routes = useRoute()
const router = useRouter()

const atrasPag = () => router.go(-1)

onMounted(async () => {
    const res = await Publicacion.get(routes.params.id);
    publicacion.value = res.data

    const sessionInfo = await getSessionInfo()

    const creadorPubli = publicacion.value.creador._id
    const usuarioLogueado = sessionInfo.usuario
    esCreador.value = creadorPubli === usuarioLogueado

    console.log('esCreador', esCreador.value)


});

</script>
