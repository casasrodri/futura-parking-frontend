<template>
    <div :class="'inline-block text-2xl text-jade-600 hover:text-jade-800 ml-3 ' + mostrarFlecha" @click="atrasPag">
        <i class="bi bi-arrow-left"></i>
    </div>
</template>


<script setup>


import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const mostrarFlecha = ref('invisible')


const atrasPag = () => router.go(-1)


watch(route, () => {
    mostrarFlecha.value = (route.fullPath == '/') ? 'invisible' : ''
})
</script>
