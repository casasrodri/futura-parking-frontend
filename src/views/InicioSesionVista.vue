<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </div>

    {{ username }}
    {{ password }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const username = ref('')
const password = ref('')

onMounted(async () => {
    // Se chequea si el usuario está logueado
    const infoSesion = await axios.get('http://localhost:8080/api/sesiones/logged')
    console.log(infoSesion.data)
    console.log(document.cookie)
    // mostrar
    // Si no está logueado, se redirige a la página de login
})

const login = async () => {
    console.log(username.value + password.value)

    const usuarios = await axios.post('http://localhost:8080/api/sesiones/login', {
        email: username.value,
        password: password.value
    })

    if (usuarios.data.ok) router.push({ name: 'principal' })


}

</script>

