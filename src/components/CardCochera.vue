<template>
    <div id="card"
        class="m-3 max-w-sm p-5 pb-2 bg-white border border-jade-200 rounded-lg shadow hover:bg-jade-100 hover:border-jade-400 hover:shadow-md flex flex-col items-center justify-center">

        <div id="acciones" class="flex flex-row w-full px-2 mt-1 items-center justify-end">

            <RouterLink :to="{ name: 'cocherasEdit', params: { id: cochera._id } }">
                <div class="mr-3 text-gray-500">
                    <i class="bi bi-pencil-fill"></i>
                </div>
            </RouterLink>


            <div class="text-red-500">
                <i class="bi bi-trash3-fill"></i>
            </div>
        </div>


        <h5 id="titulo" class="block mb-2 text-4xl font-bold tracking-tight text-jade-800">
            {{ cochera.numero }}
        </h5>

        <div id="fechas" class="flex flex-row text-xl w-full px-5 mt-2 items-center justify-center">
            <div class="text-gray-500 font-light">
                {{ capitalizar(cochera.tipo) }}
            </div>
        </div>

        <h3 id="obs" class="block mt-3 text-xs font-medium tracking-tight text-gray-900">

            <span class="text-gray-500">
                {{ cochera.observaciones }}
            </span>
        </h3>
    </div>
</template>

<script setup>
import { capitalizar } from '../utils/formats.js';


// eslint-disable-next-line no-unused-vars
const props = defineProps({
    cochera: Object,
})


</script>

