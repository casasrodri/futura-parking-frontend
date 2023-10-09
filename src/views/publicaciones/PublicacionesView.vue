<template>
    <a @click="atrasPag">◀ Atrás</a>

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

    <section id="mensajes">
        <br>
        <h2 class="block">MENSAJES</h2>
        <div v-if="conversacionesRelacionadas.length > 0">
            <template v-for="conversacion in conversacionesRelacionadas" :key="conversacion._id">
                <RouterLink :to="{ path: '/conversaciones/' + conversacion._id }">
                    <div>
                        {{ conversacion.nombre }}
                        <span v-if="conversacion.mensajes_nuevos">
                            ({{ conversacion.mensajes_nuevos }} mensajes nuevos)
                        </span>
                    </div>
                </RouterLink>
            </template>
        </div>

        <div v-else>
            <div v-if="esCreador"><!-- Vista del CREADOR -->
                <div v-if="conversacionesRelacionadas.length === 0">
                    Aún no hay mensajes...
                </div>

            </div>
            <div v-else> <!-- Vista del INTERESADO -->
                <a @click="crearChat">
                    Contactar por esta publicación
                </a>
            </div>
        </div>
    </section>

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

const round = (number) => {
    const roundedNumber = Math.round(number * 100) / 100;
    const formattedNumber = roundedNumber.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formattedNumber;
}

import { ref, onMounted, watch } from 'vue';
import Publicacion from '../../api/publicaciones.js';
import Conversacion from '../../api/conversaciones.js';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

import localUser from '../../utils/localUser.js';

import { fechaHoraISO } from '../../utils/formats.js'


const publicacion = ref({ creador: {}, vehiculo: {} })
const esCreador = ref(false)
const route = useRoute()
const router = useRouter()

const recomendadas = ref([])

const atrasPag = () => router.go(-1)

const actualizarComponente = async () => {
    const res = await Publicacion.get(route.params.id);
    publicacion.value = res.data

    const creadorPubli = publicacion.value.creador._id
    esCreador.value = creadorPubli === localUser().id

    console.log('esCreador', esCreador.value)

    const resRecomendadas = await Publicacion.obtenerRecomendaciones(route.params.id);
    recomendadas.value = resRecomendadas.data

    obtenerConversaciones()
}

const conversacionesRelacionadas = ref([])

const obtenerConversaciones = async () => {
    console.log('Obteniendo conversaciones...')
    const res = await Conversacion.obtenerPorPublicacion(route.params.id)
    const conversaciones = res.data
    const relac = []

    for (const conversacion of conversaciones) {
        const conv = await procesarConversacionAsociada(conversacion)
        console.log(conv)
        relac.push(conv)
    }

    conversacionesRelacionadas.value = relac
}

const procesarConversacionAsociada = async (conversacion) => {
    const conv = { _id: conversacion._id }

    if (conversacion.demandante._id === localUser().id) {
        conv.nombre = conversacion.oferente.nombre + ' ' + conversacion.oferente.apellido
    } else {
        conv.nombre = conversacion.demandante.nombre + ' ' + conversacion.demandante.apellido
    }

    // Buscar los mensajes no leídos
    const res = await Conversacion.contarMensajesNoLeidos(conversacion._id, localUser().id)
    conv.mensajes_nuevos = res.data.length

    return conv
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

const crearChat = async () => {
    const datos = {
        publicacion: publicacion.value._id,
        tipo: publicacion.value.tipo,
        demandante: publicacion.value.tipo === 'demanda' ? publicacion.value.creador._id : localUser().id,
        oferente: publicacion.value.tipo === 'demanda' ? localUser().id : publicacion.value.creador._id,
    }
    console.log(datos)

    const res = await Conversacion.create(datos)
    console.log(res.data)

    router.push({ path: '/conversaciones/' + res.data._id })
}

</script>
