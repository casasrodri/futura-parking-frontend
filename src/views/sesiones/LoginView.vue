<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="ingresar">
            <label for="email">Email:</label>
            <input type="text" v-model="email" placeholder="Username" />
            <br>
            <label for="password">Contraseña:</label>
            <input type="password" v-model="password" placeholder="Password" />
            <br><br>
            <button type="submit">Login</button>
        </form>
    </div>

    <div class="block">
        <br>
        <RouterLink :to="{ name: 'signup' }">Registrarse</RouterLink>
    </div>

    {{ email }}
    {{ password }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../api/sesiones.js'

const router = useRouter()

const email = ref('')
const password = ref('')

onMounted(async () => {
    // TODO Tendria que hacer que si está logueado, vaya a la pagina principal
})

const ingresar = async () => {
    try {
        const res = await login(email.value, password.value)
        console.log(res)
        if (res.data.ok) router.push({ name: 'home' })
    } catch (e) {
        console.log(e)
    }
}

</script>

