<template>
    <template v-if="cocheras.length === 0">
        <div class="text-center text-gray-600 mt-8">
            <span class="text-jade-300">
                <i class="bi bi-card-heading text-6xl"></i>
            </span>
            <p class="mt-4 text-jade-600">No has registrado cocheras...</p>
        </div>
    </template>
    <template v-else>
        <template v-for="cochera in cocheras" :key="cochera._id">
            <CardCochera :cochera="cochera" />
        </template>
    </template>

    <div class="flex w-full bottom-20 fixed place-content-end">
        <CardNuevo texto="Nueva" :to="{ name: 'cocherasAlta' }" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Cocheras from '../../api/cocheras.js'
import CardCochera from '../../components/CardCochera.vue'
import CardNuevo from '../../components/CardNuevo.vue'

const cocheras = ref([])


const cargarCocheras = async () => {
    const res = await Cocheras.obtenerDelPropietario()
    console.log(res)
    cocheras.value = res.data
}

onMounted(async () => {
    cargarCocheras()
})

</script>
