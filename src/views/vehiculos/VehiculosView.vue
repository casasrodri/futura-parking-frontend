<template>
    <div class="mt-3 ml-4">

        <h2 class="block underline text-xl mb-3">Vehículo</h2>

        <div>
            <span class="font-medium">Patente:</span>
            <p class="ml-2 text-gray-600">
                <span class="uppercase">{{ vehiculo.patente }}</span>
            </p>

        </div>

        <div>
            <span class="font-medium">Marca:</span>
            <p class="ml-2 text-gray-600">
                {{ vehiculo.marca }}
            </p>
        </div>

        <div>
            <span class="font-medium">Modelo:</span>
            <p class="ml-2 text-gray-600">
                {{ vehiculo.modelo }}
            </p>
        </div>

        <div>
            <span class="font-medium">Color:</span>
            <p class="ml-2 text-gray-600">
                {{ vehiculo.color }}
            </p>
        </div>

        <div>
            <span class="font-medium">Tipo:</span>
            <p class="ml-2 text-gray-600">
                <span class="capitalize">{{ vehiculo.tipo }}</span>
            </p>
        </div>

        <div>
            <span class="font-medium">Alias:</span>
            <p class="ml-2 text-gray-600">
                {{ vehiculo.alias }}
            </p>
        </div>

        <div>
            <span class="font-medium">Propietario:</span>
            <p class="ml-2 text-gray-600">
                <span class="capitalize">{{ vehiculo.propietario.nombre }}</span> <span class="capitalize">{{
                    vehiculo.propietario.apellido }}</span>
            </p>
        </div>

        <div v-if="localUser().id === vehiculo.propietario._id">

            <div id="acciones" class="flex flex-row w-full px-2 mt-4 items-center justify-end">

                <RouterLink :to="{ name: 'vehiculosEdit', params: { id: vehiculo._id } }">
                    <button type="button"
                        class="text-white bg-jade-500 hover:bg-jade-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                        <i class="bi bi-pencil-fill mr-2"></i>
                        Editar
                    </button>
                </RouterLink>

                <button type="button" @click="deleteVehiculo(vehiculo._id)"
                    class="mx-1 text-white bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    <i class="bi bi-trash3-fill mr-2"></i>
                    Eliminar
                </button>

            </div>
        </div>

    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Vehiculos from '../../api/vehiculos.js'
import localUser from '../../utils/localUser.js';

const route = useRoute()
const router = useRouter()
const vehiculo = ref({ tipo: '', propietario: {} })

onMounted(async () => {
    const { data } = await Vehiculos.get(route.params.id)

    console.log(data)
    vehiculo.value = data
})

const deleteVehiculo = async (id) => {
    alert('Se está eliminando la vehiculo con id: ' + id)
    const res = await Vehiculos.delete(id)
    console.log(res)
    alert('Eliminada!!')
    router.push({ name: 'vehiculosList' })
}
</script>
