<template>
    <h2>Mis cocheras</h2>

    <table class="table table-striped">
        <thead>
            <tr>
                <!-- <th>Id</th> -->
                <th>Número</th>
                <th>Tipo</th>
                <th>Observaciones</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cochera in cocheras" :key="cochera._id">
                <!-- <td>{{ cochera._id }}</td> -->
                <td>{{ cochera.numero }}</td>
                <td>{{ cochera.tipo }}</td>
                <td>{{ cochera.observaciones }}</td>
                <td>
                    <router-link :to="{ name: 'cocherasForm', params: { id: cochera._id } }"
                        class="btn btn-warning btn-sm">Editar</router-link>
                    <button class="btn btn-danger btn-sm" @click="deleteCochera(cochera._id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>

    <br><br>
    <RouterLink :to="{ path: '/cocheras/alta' }">
        Nueva
    </RouterLink>

    <br><br>
    <!-- {{ cocheras }} -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Cocheras from '../../api/cocheras.js'

const cocheras = ref([])

const deleteCochera = async (id) => {
    alert('Se está eliminando la cochera con id: ' + id)
    const res = await Cocheras.delete(id)
    console.log(res)
    alert('Eliminada!!')
    cargarCocheras()
}

const cargarCocheras = async () => {
    const res = await Cocheras.getAll()
    cocheras.value = res.data
}

onMounted(async () => {
    cargarCocheras()
})

</script>
