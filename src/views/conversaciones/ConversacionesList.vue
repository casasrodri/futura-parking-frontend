<template>
    <div v-for="conv in conversaciones" :key="conv._id">
        {{ conv }}
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Conversacion from '../../api/conversaciones.js'
import localUser from '../../utils/localUser.js';

const conversaciones = ref()

onMounted(async () => {
    const convs = await Conversacion.obtenerDelUsuario(localUser().id)
    conversaciones.value = convs.data
})

</script>
