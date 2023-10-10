<template>
    <nav class="w-full h-14 bg-jade-200 flex items-center justify-between top-0 fixed">

        <FlechaAtras />

        <RouterLink :to="{ name: 'home' }" replace>
            <div class="inline-block font-montserrat text-jade-800 font-medium text-3xl">
                Futura Parking
            </div>
        </RouterLink>

        <div class="inline-block text-2xl text-jade-600 hover:text-jade-800 mr-3" @click="mostrarUserMenu"
            :title="localUser().nombre">
            <i class="bi bi-person-circle"></i>
        </div>
    </nav>

    <MenuUsuario :activo="mostrarMenuUser" />
</template>

<script setup>

import { ref } from 'vue'
import localUser from '../utils/localUser.js'
import MenuUsuario from './MenuUsuario.vue';
import FlechaAtras from './FlechaAtras.vue';

const mostrarMenuUser = ref(false)

function mostrarUserMenu() {
    mostrarMenuUser.value = !mostrarMenuUser.value
}

</script>
