<template>
    <nav class="w-full h-14 bg-jade-200 flex items-center justify-between top-0 fixed">
        <FlechaAtras />

        <template v-if="$route.name != 'home'">
            <RouterLink :to="{ name: 'home' }" replace>
                <div class="inline-block font-montserrat text-jade-800 font-medium text-2xl">
                    Futura Parking
                </div>
            </RouterLink>
        </template>

        <div class="inline-block text-2xl text-jade-600 hover:text-jade-800 mr-4" @click="mostrarUserMenu"
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
