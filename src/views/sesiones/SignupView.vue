<template>
    <div>
        <h1>Registro</h1>
        <form @submit.prevent="login">
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="nuevoUsuario.nombre" placeholder="Nombre" />
            <br>
            <label for="apellido">Apellido:</label>
            <input type="text" v-model="nuevoUsuario.apellido" placeholder="Apellido" />
            <br>
            <label for="email">Email:</label>
            <input type="email" v-model="nuevoUsuario.email" placeholder="Email" />
            <br>
            <label for="password">Password:</label>
            <input type="password" v-model="nuevoUsuario.password" placeholder="Password" />
            <br>
            <label for="cbu">CBU/Alias:</label>
            <input type="text" v-model="nuevoUsuario.cbu" placeholder="CBU/Alias" />
            <br><br>
            <button type="submit">Registrarse</button>
        </form>
    </div>

    <div class="block">
        <br>
        <RouterLink :to="{ name: 'login' }">Iniciar sesión</RouterLink>
    </div>

    {{ errores }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../api/index.js'


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
        const res = await post('/api/usuarios', nuevoUsuario.value)
        console.log(res)

        if (res.status === 200) {
            router.push({ name: 'home' })
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

