<template>
    TITULO
    <RouterView />
    FOOTER
</template>



<script setup>

import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

onMounted(async () => {
    const infoSesion = await axios.get('http://localhost:8080/api/sesiones/logged')
    if (!infoSesion.data) router.push({ name: 'login' })
})

</script>
