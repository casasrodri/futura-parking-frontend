<template>
    <!-- {{ publicacion }} -->
    <RouterLink :to="{ path: '/publicaciones/ver/' + publicacion._id }">

        <div id="card"
            class="m-3 w-96 p-5 pb-2 bg-white border border-jade-200 rounded-lg shadow hover:bg-jade-100 hover:border-jade-400 hover:shadow-md flex flex-col items-center justify-center">

            <h5 id="titulo" class="block mb-2 text-2xl font-bold tracking-tight text-jade-800">
                <template v-if="propia">
                    <template v-if="publicacion.tipo === 'demanda'">
                        {{ capitalizar(publicacion.vehiculo.alias) }}
                    </template>
                    <template v-else>
                        {{ publicacion.cochera.numero }}
                    </template>
                </template>

                <template v-else-if="publicacion.tipo === 'demanda'">
                    {{ capitalizar(publicacion.vehiculo.tipo) }}
                </template>

                <template v-else>
                    {{ capitalizar(publicacion.cochera.tipo) }}
                </template>
            </h5>

            <div id="fechas" class="flex flex-row w-full px-5 mt-2 items-center justify-between">
                <div id="ini" class="flex flex-col items-center justify-between">
                    <div>
                        {{ fecha(publicacion.ini) }}
                    </div>
                    <div class="text-gray-500 font-light">
                        {{ hora(publicacion.ini) }}
                    </div>
                </div>

                <div id="flecha" class="text-3xl text-gray-400">
                    <i class="bi bi-arrow-right"></i>
                </div>

                <div id="ini" class="flex flex-col items-center justify-between">
                    <div>
                        {{ fecha(publicacion.fin) }}
                    </div>
                    <div class="text-gray-500 font-light">
                        {{ hora(publicacion.fin) }}
                    </div>
                </div>
            </div>

            <h3 id="publicador" class="block mt-3 text-lg font-medium tracking-tight text-gray-900">

                <template v-if="propia"> <!-- MIAS -->
                    <span class="text-gray-500">
                        <template v-if="publicacion.tipo === 'demanda'">
                            {{ publicacion.vehiculo.patente.toUpperCase() }}
                        </template>
                        <template v-else>
                            {{ publicacion.cochera.tipo }}
                        </template>
                    </span>
                </template>

                <template v-else> <!-- OTROS -->
                    {{ publicacion.creador.nombre }} {{ publicacion.creador.apellido }}
                </template>
            </h3>


            <div id="detalles" class="flex flex-row w-full px-2 mt-1 items-center justify-between">
                <div>
                    <template v-if="publicacion.tipo === 'demanda'">
                        <span
                            class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full ">demanda</span>
                    </template>
                    <template v-else>
                        <span
                            class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full ">oferta</span>
                    </template>

                    <span class="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                        <span class="text-gray-500">
                            #
                        </span>
                        {{ publicacion._id.slice(-4) }}
                    </span>
                </div>

                <div v-if="publicacion.similitud">

                    <template v-if="propia">
                        <span class="bg-orange-100 text-orange-400 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                            yo
                        </span>
                    </template>

                    <span class="bg-yellow-100 text-yellow-600 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
                        {{ round(publicacion.similitud * 100) }}
                        <span class="text-yellow-500">
                            %
                        </span>
                    </span>
                </div>

            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { fecha, hora, capitalizar } from '../utils/formats.js';
import localUser from '../utils/localUser.js';
const propia = ref(false)


// eslint-disable-next-line no-unused-vars
const props = defineProps({
    // FIXME: cambiar por el tipo correcto
    publicacion: Object
})


onMounted(() => {
    propia.value = localUser().id === props.publicacion.creador._id
})


const round = (number) => {
    const roundedNumber = Math.round(number);
    // const roundedNumber = Math.round(number * 100) / 100;
    // const formattedNumber = roundedNumber.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return roundedNumber;
}
</script>

