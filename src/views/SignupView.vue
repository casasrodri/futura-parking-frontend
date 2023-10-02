<template>
    <div>
        <h1>Registro</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="nuevoUsuario.nombre" placeholder="Nombre" />
            <input type="text" v-model="nuevoUsuario.apellido" placeholder="Apellido" />
            <input type="email" v-model="nuevoUsuario.email" placeholder="Email" />
            <input type="password" v-model="nuevoUsuario.password" placeholder="Password" />
            <input type="password" v-model="nuevoUsuario.cbu" placeholder="CBU/Alias" />
            <button type="submit">Registrarse</button>
        </form>
    </div>

    {{ errores }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


import axios from 'axios'

const router = useRouter()
const nuevoUsuario = ref({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    cbu: ''
})
const errores = ref([])

const login = async () => {
    // FIXME: Hacer algunas validaciones al formulario
    try {
        const res = await axios.post('http://localhost:8080/api/usuarios', nuevoUsuario.value)

        if (res.status === 200) {
            router.push({ name: 'principal' })
        }
    } catch (error) {
        console.log(error.response.data)
        errores.value = error.response.data
    }
}

onMounted(async () => {
    // Se chequea si el usuario está logueado
    const infoSesion = await axios.get('http://localhost:8080/api/sesiones')
    console.log(infoSesion.data)
    console.log(document.cookie)
    // mostrar
    // Si no está logueado, se redirige a la página de login
})


</script>

