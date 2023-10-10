<template>
    <div :class="`flex items-center justify-center text-4xl w-16 h-16 rounded-md ${selected}`">
        <i :class="`bi bi-${icono}`"></i>
        <!-- {{ selected }} -->
    </div>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({
    icono: String,
    seleccionado: Boolean
})

const selected = computed(() => {
    if (props.seleccionado) {
        return 'text-jade-100 hover:text-jade-50 bg-jade-600 hover:bg-jade-700'
    } else {
        return 'text-jade-400 hover:text-jade-500 bg-jade-50 hover:bg-jade-100'
    }
})
</script>
