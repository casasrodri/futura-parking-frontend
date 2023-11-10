<template>
    <RouterLink :to="{ name: 'vehiculosView', params: { id: vehiculo._id } }">
        <div id="card"
            class="m-3 w-96 p-5 pb-2 bg-white border border-jade-200 rounded-lg shadow hover:bg-jade-100 hover:border-jade-400 hover:shadow-md flex flex-col items-center justify-center">

            <h5 id="titulo" class="block mb-2 text-4xl font-bold tracking-tight text-jade-800">
                {{ vehiculo.alias }}
            </h5>

            <div id="fechas" class="flex flex-row text-xl w-full px-5 mt-2 items-center justify-center">
                <div class="text-gray-500 font-light">
                    {{ vehiculo.patente.toUpperCase() }}
                </div>
            </div>

            <h3 id="obs" class="block mt-3 text-xs font-medium tracking-tight text-gray-900">

                <span class="text-gray-500">
                    {{ vehiculo.marca }}
                    {{ vehiculo.modelo }}
                </span>
            </h3>
        </div>
    </RouterLink>
</template>

<script setup>

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    vehiculo: Object,
})


</script>

