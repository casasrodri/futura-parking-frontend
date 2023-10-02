<template>
    <RouterLink :to="{ name: 'home' }">
        <h1>
            <img src="/icon.svg" alt="Logo" height="40" width="40">
            Futura Parking
        </h1>
    </RouterLink>

    <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSessionInfo } from '../api/sesiones.js'

onMounted(async () => {
    const router = useRouter()
    const sessionInfo = await getSessionInfo()
    // console.log(sessionInfo)
    if (!sessionInfo.isLogged) router.push({ name: 'login' })
})

</script>
