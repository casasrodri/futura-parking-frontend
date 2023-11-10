<template>
    <div class="mt-3 ml-4">

        <h2 class="block underline text-xl mb-3">Cochera</h2>

        <div>
            <span class="font-medium">Número:</span>
            <p class="ml-2 text-gray-600">
                {{ cochera.numero }}
            </p>
        </div>

        <div>
            <span class="font-medium">Tipo:</span>
            <p class="ml-2 text-gray-600">
                <span class="capitalize">{{ cochera.tipo }}</span>
            </p>
        </div>

        <div v-if="cochera.observaciones">
            <span class="font-medium">Observaciones:</span>
            <p class="ml-2 text-gray-600">
                {{ cochera.observaciones }}
            </p>
        </div>

        <div>
            <span class="font-medium">Propietario:</span>
            <p class="ml-2 text-gray-600">
                <span class="capitalize">{{ cochera.propietario.nombre }}</span> <span class="capitalize">{{
                    cochera.propietario.apellido }}</span>
            </p>
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
import localUser from '../../utils/localUser.js';
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const cochera = ref({ tipo: '', propietario: {} })

onMounted(async () => {
    const { data } = await Cocheras.get(route.params.id)

    console.log(data)
    cochera.value = data
})

const deleteCochera = async (id) => {
    Swal.fire({
        title: "Deseas eliminar la cochera?",
        text: 'cochera con id: ' + id,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1acd81",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then(async (result) => {
        if (result.isConfirmed) {

            const res = await Cocheras.delete(id)
            console.log(res)

            Swal.fire({
                title: "Eliminada!",
                text: "La cochera ha sido eliminada.",
                icon: "success"
            });

            router.push({ name: 'cocherasList' })
        }
    });
}
</script>
