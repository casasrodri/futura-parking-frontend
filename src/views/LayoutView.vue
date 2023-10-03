<template>
    <div style="width: 100; margin: 0;">
        <RouterLink :to="{ name: 'home' }">
            <h1>
                <img src="/icon.svg" alt="Logo" height="40" width="40">
                Futura Parking
            </h1>
        </RouterLink>

        <div class="block" v-if="usuario">
            Usuario: {{ usuario }}
            <button @click="cerrarSesion">
                Cerrar sesión
            </button>
        </div>

        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSessionInfo } from '../api/sesiones.js'
import { get } from '../api/index.js'

const usuario = ref('')
const router = useRouter()

const cerrarSesion = async () => {
    const res = await get('/api/sesiones/logout')
    console.log(res)
    router.push({ name: 'login' })
}

onMounted(async () => {
    const sessionInfo = await getSessionInfo()
    // console.log(sessionInfo)
    if (!sessionInfo.isLogged) router.push({ name: 'login' })

    usuario.value = sessionInfo.nombre
})

</script>
