<template>
    <div :class="'border-3 shadow-md fixed right-2 top-14 bg-jade-100/90 z-10 p-2 px-6 mr-2 ' + visible">

        <div class="mt-2 font-medium text-jade-900" :title="localUser().id">
            {{ localUser().nombreCompleto }}
        </div>
        <hr class="h-px mt-2 bg-jade-200 border-0">

        <div class="my-4">
            <RouterLink :to="{ name: 'ayuda' }">
                Ayuda
            </RouterLink>
        </div>

        <div class="my-4">
            <RouterLink :to="{ name: 'version' }">
                Versión
            </RouterLink>
        </div>

        <div class="my-4 cursor-pointer text-red-500" @click="cerrarSesion">
            Cerrar sesión
        </div>
    </div>
</template>


<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import localUser from '../utils/localUser.js'

const router = useRouter()
const props = defineProps({
    activo: Boolean
})

const visible = computed(() => {
    if (props.activo) {
        return ''
    } else {
        return 'invisible'
    }
})

import Cookies from '../utils/cookies.js';
const cerrarSesion = async () => {
    Cookies.remove('id')
    Cookies.remove('nombre')
    Cookies.remove('nombreCompleto')
    Cookies.remove('jwt')

    router.push({ name: 'login' })
}

</script>
