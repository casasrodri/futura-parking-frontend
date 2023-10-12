<template>
    <div class="mt-3 ml-4">

        <h2 class="block underline text-xl mb-3">Cochera</h2>

        <div>
            <span class="font-medium">
                Número:
            </span>
            {{ cochera.numero }}
        </div>

        <div>
            <span class="font-medium">
                Tipo:
            </span>
            {{ capitalizar(cochera.tipo) }}
        </div>

        <div>
            <span class="font-medium">
                Observaciones:
            </span>
            {{ cochera.observaciones }}
        </div>

        <div>
            <span class="font-medium">
                Propietario:
            </span>
            {{ cochera.propietario.nombre }} {{ cochera.propietario.apellido }}
        </div>

        <div v-if="localUser().id === cochera.propietario._id">

            <div id="acciones" class="flex flex-row w-full px-2 mt-4 items-center justify-end">

                <RouterLink :to="{ name: 'cocherasEdit', params: { id: cochera._id } }">
                    <button type="button"
                        class="text-white bg-jade-500 hover:bg-jade-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                        <i class="bi bi-pencil-fill mr-2"></i>
                        Editar
                    </button>
                </RouterLink>

                <button type="button" @click="deleteCochera(cochera._id)"
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
import Cocheras from '../../api/cocheras.js'
import { capitalizar } from '../../utils/formats.js';
import localUser from '../../utils/localUser.js';

const route = useRoute()
const router = useRouter()
const cochera = ref({ tipo: '', propietario: {} })

onMounted(async () => {
    const { data } = await Cocheras.get(route.params.id)

    console.log(data)
    cochera.value = data
})

const deleteCochera = async (id) => {
    alert('Se está eliminando la cochera con id: ' + id)
    const res = await Cocheras.delete(id)
    console.log(res)
    alert('Eliminada!!')
    router.push({ name: 'cocherasList' })
}
</script>
