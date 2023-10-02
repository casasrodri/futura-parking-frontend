<template>
    <h2>FORMULARIO</h2>


    <form @submit.prevent="btnFuncion">

        <label for="numero">Patente</label>
        <input type="text" v-model="vehiculo.patente" placeholder="Patente" />

        <br>
        <label for="numero">Marca</label>
        <input type="text" v-model="vehiculo.marca" placeholder="Marca" />

        <br>
        <label for="numero">Modelo</label>
        <input type="text" v-model="vehiculo.modelo" placeholder="Modelo" />

        <br>
        <label for="numero">Color</label>
        <input type="text" v-model="vehiculo.color" placeholder="Color" />

        <br>
        <label for="tipo">Tipo</label>
        <select v-model="vehiculo.tipo">
            <option value="automovil">Automóvil</option>
            <option value="camioneta">Camioneta</option>
            <option value="motocicleta">Motocicleta</option>
        </select>

        <br>
        <label for="numero">Alias</label>
        <input type="text" v-model="vehiculo.alias" placeholder="Alias" />

        <br>
        <button type="submit">{{ btnGuardar }}</button>
    </form>

    <br><br>
    {{ errores }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cochera from '../../api/vehiculos.js'

const router = useRouter()
const errores = ref([])
const vehiculo = ref({})

const actualizar = async () => {
    alert('Se está actualizando')
    const res = await Cochera.update(vehiculo.value._id, vehiculo.value)
    console.log(res)
    alert('Actualizada!!')
    router.push({ name: 'vehiculosList' })
}

const registrar = async () => {
    alert('Se está creando el nuevo vehiculo')

    const nuevoVehiculo = {
        patente: vehiculo.value.patente,
        marca: vehiculo.value.marca,
        modelo: vehiculo.value.modelo,
        color: vehiculo.value.color,
        tipo: vehiculo.value.tipo,
        propietario: '6513a457bed50d37c2a7910a', // FIXME: Ver cómo obtener el id del usuario logueado
        alias: vehiculo.value.alias,
    }

    const res = await Cochera.create(nuevoVehiculo)
    console.log(res)
    alert('Creada!!')
    router.push({ name: 'vehiculosList' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const routes = useRoute()

onMounted(async () => {
    if (routes.params.id === 'alta') {
        console.log('nueva')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar
    } else {
        console.log('editar')
        const res = await Cochera.get(routes.params.id)
        vehiculo.value = res.data
    }
})

</script>
