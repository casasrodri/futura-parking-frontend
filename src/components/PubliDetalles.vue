<template>
    <section id="infoPublicacion" v-if="publicacion._id" class="mt-3">

        <h2 class="block underline text-xl mx-2">Detalles</h2>

        <div id="tarjeta-datos" class="mx-2 mt-2">
            <div>
                <span class="font-medium">
                    Tipo:
                </span>

                <span v-if="publicacion.tipo === 'oferta'">
                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        oferta
                    </span>
                </span>
                <span v-else-if="publicacion.tipo === 'demanda'">
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        demanda
                    </span>
                </span>
            </div>


            <div>
                <span class="font-medium">
                    Estado:
                </span>

                <span v-if="publicacion.estado === 'disponible'">
                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        disponible
                    </span>
                </span>
                <span v-else>
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        finalizada
                    </span>
                </span>
            </div>

            <div v-if="publicacion.observaciones">
                <span class="font-medium">
                    Observaciones:
                </span>

                {{ publicacion.observaciones }}
            </div>

            <div>
                <span class="font-medium">
                    Inicio:
                </span>

                {{ fecha(publicacion.ini) }}
                {{ hora(publicacion.ini) }}
            </div>

            <div>
                <span class="font-medium">
                    Fin:
                </span>

                {{ fecha(publicacion.fin) }}
                {{ hora(publicacion.fin) }}
            </div>

            <div>
                <span class="font-medium">
                    Creador:
                </span>

                {{ publicacion.creador.nombre }}
                {{ publicacion.creador.apellido }}
            </div>

            <span v-if="publicacion.vehiculo">
                <span class="font-medium">
                    Vehículo:
                </span>

                <RouterLink :to="{ name: 'vehiculosView', params: { id: publicacion.vehiculo._id } }">
                    <span v-if="esCreador">
                        {{ publicacion.vehiculo.alias }} ({{ publicacion.vehiculo.patente }})
                    </span>
                    <span v-else>
                        {{ publicacion.vehiculo.marca }}
                        {{ publicacion.vehiculo.modelo }}
                        ({{ publicacion.vehiculo.patente }})
                    </span>
                </RouterLink>
                <br>
            </span>

            <span v-if="publicacion.cochera">
                <span class="font-medium">
                    Cochera:
                </span>

                <RouterLink :to="{ name: 'cocherasView', params: { id: publicacion.cochera._id } }">
                    {{ publicacion.cochera.numero }} ({{ publicacion.cochera.tipo }})
                </RouterLink>
                <br>
            </span>

            <div v-if="esCreador">
                <!-- FIXME Agregar botonera acá -->
                <RouterLink :to="{ path: '/publicaciones/editar/' + publicacion._id }">
                    <div class="mr-3 text-gray-500">
                        <i class="bi bi-pencil-fill"></i>
                    </div>
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { fecha, hora } from '../utils/formats.js'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
    esCreador: Boolean,
})

</script>
