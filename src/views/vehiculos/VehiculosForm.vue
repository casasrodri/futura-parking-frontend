<template>
    <div class="mt-3 ml-4 mr-4">
        <h2 class="block underline text-xl mb-3">{{ titulo }}</h2>


        <form @submit.prevent="btnFuncion">

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Patente
                </label>
                <input type="text" required v-model="vehiculo.patente"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Marca
                </label>
                <input type="text" required v-model="vehiculo.marca"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Modelo
                </label>
                <input type="text" required v-model="vehiculo.modelo"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Color
                </label>
                <input type="text" required v-model="vehiculo.color"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Tipo
                </label>
                <select v-model="vehiculo.tipo"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    <option value="automovil">Automóvil</option>
                    <option value="camioneta">Camioneta</option>
                    <option value="motocicleta">Motocicleta</option>
                </select>
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Alias
                </label>
                <input type="text" required v-model="vehiculo.alias"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
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

        <!-- {{ vehiculo }} -->
        <!-- {{ errores }} -->
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Vehiculo from '../../api/vehiculos.js'
import localUser from '../../utils/localUser.js';

const router = useRouter()
const errores = ref([])
const vehiculo = ref({})

const actualizar = async () => {
    alert('Se está actualizando')
    const res = await Vehiculo.update(vehiculo.value._id, vehiculo.value)
    console.log(res)
    alert('Actualizado!!')
    router.push({ name: 'vehiculosList' })
}

const registrar = async () => {
    alert('Se está creando el nuevo vehiculo')


    const nuevoVehiculo = {
        patente: vehiculo.value.patente,
        marca: vehiculo.value.marca,
        modelo: vehiculo.value.modelo,
        color: vehiculo.value.color,
        tipo: vehiculo.value.tipo,
        propietario: localUser().id,
        alias: vehiculo.value.alias,
    }

    const res = await Vehiculo.create(nuevoVehiculo)
    console.log(res)
    alert('Creado!!')
    router.push({ name: 'vehiculosList' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const titulo = ref('Editar vehículo')
const route = useRoute()

onMounted(async () => {
    if (route.name === 'vehiculosAlta') {
        console.log('nueva')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar
        titulo.value = 'Nuevo vehículo'
    } else {
        console.log('editar')
        const res = await Vehiculo.get(route.params.id)
        vehiculo.value = res.data
    }
})

</script>
