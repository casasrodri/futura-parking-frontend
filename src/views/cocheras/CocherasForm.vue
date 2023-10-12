<template>
    <div class="mt-3 ml-4 mr-4">

        <h2 class="block underline text-xl mb-3">{{ titulo }}</h2>

        <form @submit.prevent="btnFuncion">

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Número
                </label>
                <input type="number" required v-model="cochera.numero"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" />
            </div>

            <div class="my-3">
                <label class="block mb-2 text-sm font-medium text-gray-900">
                    Tipo
                </label>
                <select v-model="cochera.tipo"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                    <option value="semi-cubierta">Semi-Cubierta</option>
                    <option value="subterránea">Subterránea</option>
                </select>
            </div>

            <div class="my-3">
                <label for="observaciones" class="block mb-2 text-sm font-medium text-gray-900">
                    Observaciones
                </label>
                <textarea id="observaciones" rows="3"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder="" v-model="cochera.observaciones" required></textarea>
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

        <!-- {{ cochera }}
        <br><br> -->
        <!-- {{ errores }} -->
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cochera from '../../api/cocheras.js'

const router = useRouter()
const errores = ref([])
const cochera = ref({
    numero: '',
    tipo: '',
    observaciones: ''
})

import localUser from '../../utils/localUser.js'

const actualizar = async () => {
    alert('Se está actualizando')
    const res = await Cochera.update(cochera.value._id, cochera.value)
    alert('Actualizada!!')
    router.push({ name: 'cocherasList' })
}

const registrar = async () => {
    alert('Se está creando la nueva cochera')


    const nuevaCochera = {
        numero: cochera.value.numero,
        tipo: cochera.value.tipo,
        observaciones: cochera.value.observaciones,
        propietario: localUser().id
    }

    const res = await Cochera.create(nuevaCochera)
    console.log(res)
    alert('Creada!!')
    router.push({ name: 'cocherasList' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const titulo = ref('Editar cochera')
const route = useRoute()

onMounted(async () => {
    if (route.name === 'cocherasAlta') {
        // console.log('alta')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar
        titulo.value = 'Nueva cochera'
    } else {
        // console.log('editar')
        const res = await Cochera.get(route.params.id)
        // console.log(res)
        cochera.value = res.data
    }
})

</script>
