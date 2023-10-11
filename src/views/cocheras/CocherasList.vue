<template>
    <template v-for="cochera in cocheras" :key="cochera._id">
        <CardCochera :cochera="cochera" />
    </template>

    <div class="flex w-full bottom-20 fixed place-content-end">
        <CardNuevo texto="Nueva" :to="{ name: 'cocherasAlta' }" />
    </div>

    <div v-for="cochera in cocheras" :key="cochera._id">
        {{ cochera.numero }}
        <button class="btn btn-danger btn-sm" @click="deleteCochera(cochera._id)">Eliminar</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Cocheras from '../../api/cocheras.js'
import CardCochera from '../../components/CardCochera.vue'
import CardNuevo from '../../components/CardNuevo.vue'

const cocheras = ref([])

const deleteCochera = async (id) => {
    alert('Se está eliminando la cochera con id: ' + id)
    const res = await Cocheras.delete(id)
    console.log(res)
    alert('Eliminada!!')
    cargarCocheras()
}

const cargarCocheras = async () => {
    const res = await Cocheras.obtenerDelPropietario()
    console.log(res)
    cocheras.value = res.data
}

onMounted(async () => {
    cargarCocheras()
})

</script>
