<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="ingresar">
            <input type="text" v-model="username" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    </div>

    {{ username }}
    {{ password }}

    <div class="block">
        <RouterLink :to="{ name: 'signup' }">Registrarse</RouterLink>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../api/sesiones.js'

const router = useRouter()

const username = ref('')
const password = ref('')

onMounted(async () => {
    // TODO Tendria que hacer que si está logueado, vaya a la pagina principal
})

const ingresar = async () => {
    try {
        const res = await login(username.value, password.value)
        console.log(res)
        if (res.data.ok) router.push({ name: 'home' })
    } catch (e) {
        console.log(e)
    }
}

</script>

