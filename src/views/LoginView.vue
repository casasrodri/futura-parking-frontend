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

import { login as apiLogin } from '../api/sesiones.js'

const router = useRouter()

const username = ref('')
const password = ref('')

onMounted(async () => {
    // TODO Tendria que hacer que si está logueado, vaya a la pagina principal
})


const login = async () => {

    try {
        const res = await apiLogin(username.value, password.value)
        if (res.data.ok) router.push({ name: 'home' })
    } catch (e) {
        console.log(e)
    }
}

</script>

