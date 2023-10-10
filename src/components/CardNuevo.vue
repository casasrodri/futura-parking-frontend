<template>
    <RouterLink :to="{ name: 'publicacionesAlta' }">

        <div class="max-w-full flex flex-col items-center justify-center m-2">

            <button type="button"
                class="text-white bg-jade-500 hover:bg-jade-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                <i class="bi bi-plus-circle-fill mr-2"></i>
                Nueva
            </button>
        </div>
    </RouterLink>
</template>

<script setup>
import { fecha, hora, capitalizar } from '../utils/formats.js';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    publicacion: Object,
    propia: Boolean,
})

const round = (number) => {
    const roundedNumber = Math.round(number * 100) / 100;
    const formattedNumber = roundedNumber.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return formattedNumber;
}
</script>

