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
import { checkLogged } from '../api/sesiones.js'
import { get } from '../api/index.js'

onMounted(async () => {
    const router = useRouter()
    if (!await checkLogged()) router.push({ name: 'login' })
})

</script>
