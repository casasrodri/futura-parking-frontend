<template>
    <h2>Mis vehículos</h2>
    <!-- TODO podria agregar la persona que maneja el vehiculo, para poder avisar a la guardia. Opción (Conductor: yo o habilitar campo) -->
    <table class="table table-striped">
        <thead>
            <tr>
                <!-- <th>Id</th> -->
                <th>Alias</th>
                <th>Patente</th>
                <th>Tipo</th>
                <th>Modelo</th>
                <th>Color</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="vehiculo in vehiculos" :key="vehiculo._id">
                <!-- <td>{{ vehiculo._id }}</td> -->
                <td>{{ vehiculo.alias }}</td>
                <td>{{ vehiculo.patente }}</td>
                <td>{{ vehiculo.tipo }}</td>
                <td>{{ vehiculo.marca }} {{ vehiculo.modelo }}</td>
                <td>{{ vehiculo.color }}</td>
                <td>
                    <router-link :to="{ name: 'vehiculosForm', params: { id: vehiculo._id } }"
                        class="btn btn-warning btn-sm">Editar</router-link>
                    <button class="btn btn-danger btn-sm" @click="deleteCochera(vehiculo._id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>

    <br><br>
    <RouterLink :to="{ path: '/vehiculos/alta' }">
        Nuevo
    </RouterLink>

    <br><br>
    <!-- {{ vehiculos }} -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Vehiculos from '../../api/vehiculos.js'

const vehiculos = ref([])

const deleteCochera = async (id) => {
    alert('Se está eliminando la vehiculo con id: ' + id)
    const res = await Vehiculos.delete(id)
    console.log(res)
    alert('Eliminada!!')
    cargarVehiculos()
}

const cargarVehiculos = async () => {
    const res = await Vehiculos.obtenerDelPropietario()
    vehiculos.value = res.data
}

onMounted(async () => {
    cargarVehiculos()
})

</script>
