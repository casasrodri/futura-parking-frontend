<template>
    <div style="width: 100; margin: 0;">
        <RouterLink :to="{ name: 'home' }">
            <h1>
                <img src="/icon.svg" alt="Logo" height="40" width="40">
                Futura Parking
            </h1>
        </RouterLink>

        <div class="block" v-if="localUser().id">
            Usuario: {{ localUser().nombre }} (id: {{ localUser().id }})

            <button @click="cerrarSesion">
                Cerrar sesión
            </button>
        </div>
        <hr>

        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import localUser from '../utils/localUser.js'

const router = useRouter()

const cerrarSesion = async () => {
    localStorage.removeItem('id')
    localStorage.removeItem('nombre')
    localStorage.removeItem('jwt')

    router.push({ name: 'login' })
}

onMounted(async () => {
    if (!localUser().id) router.push({ name: 'login' })
})

</script>
