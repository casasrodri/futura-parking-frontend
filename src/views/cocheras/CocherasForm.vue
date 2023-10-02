<template>
    <h2>FORMULARIO</h2>


    <form @submit.prevent="btnFuncion">
        <label for="numero">Número</label>
        <input type="number" v-model="cochera.numero" placeholder="Número" />

        <br>
        <label for="tipo">Tipo</label>
        <select v-model="cochera.tipo">
            <option value="semi-cubierta">Semi-Cubierta</option>
            <option value="subterránea">Subterránea</option>
        </select>

        <br>
        <label for="observaciones">Observaciones</label>
        <textarea v-model="cochera.observaciones" placeholder="Observaciones"></textarea>

        <br>
        <button type="submit">{{ btnGuardar }}</button>
    </form>

    <br><br>
    {{ errores }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Cochera from '../../api/cocheras.js'

const router = useRouter()
const errores = ref([])
const cochera = ref({
    numero: '',
    tipo: '',
    observaciones: ''
})

import { put } from '../../api/index.js'
import axios from 'axios';

const actualizar = async () => {
    alert('Se está actualizando')
    const res = await Cochera.update(cochera.value._id, cochera.value)
    alert('Actualizada!!')
    router.push({ name: 'cocherasList' })
}

const registrar = async () => {
    alert('Se está creando la nueva cochera')

    const nuevaCochera = {
        numero: cochera.value.numero,
        tipo: cochera.value.tipo,
        observaciones: cochera.value.observaciones,
        propietario: '6513a457bed50d37c2a7910a' // FIXME: Ver cómo obtener el id del usuario logueado

    }

    const res = await Cochera.create(nuevaCochera)
    console.log(res)
    alert('Creada!!')
    router.push({ name: 'cocherasList' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const routes = useRoute()

onMounted(async () => {
    if (routes.params.id === 'alta') {
        // console.log('alta')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar
    } else {
        // console.log('editar')
        const res = await Cochera.get(routes.params.id)
        // console.log(res)
        cochera.value = res.data
    }
})

</script>
