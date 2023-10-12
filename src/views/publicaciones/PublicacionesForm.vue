<template>
    <div class="mt-3 ml-4 mr-4">
        <h2 class="block underline text-xl mb-3">{{ titulo }}</h2>


        <form @submit.prevent="btnFuncion">

            <template v-if="$route.name !== 'publicacionesAlta'">
                <div class="my-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                        Tipo
                    </label>
                    <select v-model="publi.tipo" disabled
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option value="oferta">Oferta</option>
                        <option value="demanda">Solicitud</option>
                    </select>
                </div>
            </template>

            <template v-else>
                <div class="my-3">
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                        Tipo
                    </label>
                    <select v-model="publi.tipo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option value="oferta">Oferta</option>
                        <option value="demanda">Solicitud</option>
                    </select>
                </div>
            </template>


            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Inicio
                </label>
                <input type="datetime-local" required v-model="publi.ini" :max="publi.fin"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Fin
                </label>
                <input type="datetime-local" required v-model="publi.fin" :min="publi.ini"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label for="observaciones" class="block mb-2 text-sm font-medium text-gray-900">
                    Observaciones
                </label>
                <textarea id="observaciones" rows="3"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" v-model="publi.observaciones" required></textarea>
            </div>


            <div class="my-3" v-if="publi.tipo === 'oferta'">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Cochera
                </label>
                <select v-model="publi.oferta.cochera"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    <option v-for="coch in cocherasPropietario" :key="coch._id" :value="coch._id">
                        {{ coch.numero }} ({{ coch.tipo }})
                    </option>
                </select>
            </div>


            <div class="my-3" v-if="publi.tipo === 'demanda'">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Vehículo
                </label>
                <select v-model="publi.demanda.vehiculo"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    <option v-for="vehi in vehiculosPropietario" :key="vehi._id" :value="vehi._id">
                        {{ vehi.alias }} ({{ vehi.patente.toUpperCase() }})
                    </option>
                </select>
            </div>


            <div class="flex w-full justify-end mt-4">
                <button type="submit"
                    class="mx-1 text-white bg-jade-500 hover:bg-jade-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    <template v-if="btnGuardar == 'Actualizar'">
                        <i class="bi bi-arrow-repeat mr-2"></i>
                    </template>
                    <template v-else>
                        <i class="bi bi-arrow-return-right mr-2"></i>
                    </template>
                    {{ btnGuardar }}
                </button>
            </div>
        </form>

        <!-- {{ publiGuardar }} -->

    </div>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Publicacion from '../../api/publicaciones.js'

const router = useRouter()
const publi = ref({ tipo: '', estado: 'disponible', oferta: {}, demanda: {} })

const actualizar = async () => {
    alert('Se está actualizando la publicación...')
    const res = await Publicacion.update(publi.value._id, publiGuardar.value)
    console.log(res)
    alert('Actualizada!!')
    router.go(-1)
}

const publiGuardar = computed(() => {
    const guardar = { ...publi.value }
    guardar.creador = localUser().id

    if (publi.value.tipo === 'oferta') {
        guardar.cochera = publi.value.oferta.cochera
    } else {
        guardar.vehiculo = publi.value.demanda.vehiculo
    }

    return guardar
})

const cocherasPropietario = ref([])
const vehiculosPropietario = ref([])

const registrar = async () => {
    alert('Se está creando la nueva publicación...')
    const res = await Publicacion.create(publiGuardar.value)
    console.log(res)
    alert('Creada!!')
    router.go(-1)
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const titulo = ref('Editar publicación')
const routes = useRoute()

import Cochera from '../../api/cocheras.js'
import Vehiculo from '../../api/vehiculos.js'
import localUser from '../../utils/localUser.js';
import { fechaHoraISO } from '../../utils/formats.js';

onMounted(async () => {

    if (routes.name === 'publicacionesAlta') {
        console.log('alta')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar
        titulo.value = 'Nueva publicación'

    } else {
        console.log('editar')
        const res = await Publicacion.get(routes.params.id)
        const publicacion = { ...res.data }

        publicacion.demanda = {
            vehiculo: publicacion.vehiculo ? publicacion.vehiculo._id : ''
        }

        publicacion.oferta = {
            cochera: publicacion.cochera ? publicacion.cochera._id : '',
            precio: publicacion.cochera ? publicacion.precio : ''
        }

        // Convertir las horas a formato date y time
        publicacion.ini = fechaHoraISO(publicacion.ini)
        publicacion.fin = fechaHoraISO(publicacion.fin)

        publi.value = publicacion
    }

    const { data: dataCocheras } = await Cochera.obtenerDelPropietario()
    cocherasPropietario.value = dataCocheras

    const { data: dataVehiculos } = await Vehiculo.obtenerDelPropietario()
    vehiculosPropietario.value = dataVehiculos

})

</script>

