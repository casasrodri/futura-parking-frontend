<template>
    <nav class="w-full h-14 bg-jade-200 flex items-center justify-between top-0 fixed">

        <div :class="'inline-block text-2xl text-jade-600 hover:text-jade-800 ml-3 ' + mostrarFlecha" @click="atrasPag">
            <i class="bi bi-arrow-left"></i>
        </div>

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

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import localUser from '../utils/localUser.js'
import MenuUsuario from './MenuUsuario.vue';

const router = useRouter()
const route = useRoute()
const mostrarMenuUser = ref(false)
const mostrarFlecha = ref('invisible')

const atrasPag = () => router.go(-1)

function mostrarUserMenu() {
    mostrarMenuUser.value = !mostrarMenuUser.value
}

watch(route, () => {
    mostrarFlecha.value = (route.fullPath == '/') ? 'invisible' : ''
})

</script>
