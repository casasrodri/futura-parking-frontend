<template>
    <RouterView />

    <hr>

    <RouterLink :to="{ name: 'misPublicaciones' }" v-if="$route.name !== 'misPublicaciones'">
        Mis publicaciones
    </RouterLink>
    <RouterLink :to="{ name: 'publicacionesOfertas' }" v-else>
        Todas las publicaciones
    </RouterLink>
</template>

<script setup>
import { RouterView } from 'vue-router'

</script>
