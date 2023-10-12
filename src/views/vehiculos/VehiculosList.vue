<template>
    <!-- TODO podria agregar la persona que maneja el vehiculo, para poder avisar a la guardia. Opción (Conductor: yo o habilitar campo) -->

    <template v-for="vehiculo in vehiculos" :key="vehiculo._id">
        <CardVehiculo :vehiculo="vehiculo" />
    </template>

    <div class="flex w-full bottom-20 fixed place-content-end">
        <CardNuevo texto="Nuevo" :to="{ name: 'vehiculosAlta' }" />
    </div>


    <div v-for="vehiculo in vehiculos" :key="vehiculo._id">
        {{ vehiculo.alias }}
        <button class="" @click="deleteCochera(vehiculo._id)">Eliminar</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Vehiculos from '../../api/vehiculos.js'
import CardVehiculo from '../../components/CardVehiculo.vue'
import CardNuevo from '../../components/CardNuevo.vue'

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
