<template>
    <a @click="atrasPag">◀ Atrás</a>
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

    <!-- TODO -->
    <div v-if="esCreador">
        <h2 class="block">MENSAJES</h2>
        Aún no hay mensajes...
    </div>
    <div v-else>
        <!-- TODO Ver como calcular el porcentaje -->
        <br>
        % coincidencia: 88,90%



        <br>
        <a @click="crearChat">
            Contactar por esta publicación
        </a>
    </div>


    <!-- TODO Ver si esto lo ven ambos, o el publicador -->
    <br>
    <br>
    <h2 class="block">PUBLICACIONES RELACIONADAS</h2>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import Conversacion from '../../api/conversaciones.js';
import { useRoute, useRouter } from 'vue-router';

import { getSessionInfo } from '../../api/sesiones.js';

import { fechaHoraISO } from '../../utils/formats.js'


const publicacion = ref({ creador: {}, vehiculo: {} })
const esCreador = ref(false)
const routes = useRoute()
const router = useRouter()

const atrasPag = () => router.go(-1)
const sessionInfo = ref({})

onMounted(async () => {
    const res = await Publicacion.get(routes.params.id);
    publicacion.value = res.data

    sessionInfo.value = await getSessionInfo()

    const creadorPubli = publicacion.value.creador._id
    const usuarioLogueado = sessionInfo.value.usuario
    esCreador.value = creadorPubli === usuarioLogueado

    console.log('esCreador', esCreador.value)
});

const crearChat = async () => {
    const datos = {
        publicacion: publicacion.value._id,
        tipo: publicacion.value.tipo,
        demandante: publicacion.value.tipo === 'demanda' ? publicacion.value.creador._id : sessionInfo.value.usuario,
        oferente: publicacion.value.tipo === 'demanda' ? sessionInfo.value.usuario : publicacion.value.creador._id,
    }
    console.log(datos)

    const res = await Conversacion.create(datos)
    console.log(res.data)

    router.push({ path: '/conversaciones/' + res.data._id })
}

</script>
