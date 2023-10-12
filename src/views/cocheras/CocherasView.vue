<template>
    Numero {{ cochera.numero }}
    Tipo {{ cochera.tipo }}

    Observaciones {{ cochera.observaciones }}

    Propietario {{ cochera.propietario.nombre }} {{ cochera.propietario.apellido }}

    <!-- {{ $route.params.id }} -->

    <!-- {{ cochera }} -->
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Cochera from '../../api/cocheras.js'
import conversaciones from '../../api/conversaciones';

const route = useRoute()
const cochera = ref({ propietario: {} })

onMounted(async () => {
    const { data } = await Cochera.get(route.params.id)

    console.log(data)
    cochera.value = data
})

</script>
