<template>
    <div :class="estilos.lado">
        <div :class="'border-2 w-max max-w-xs p-2 my-2 rounded-lg ' + estilos.color">
            <div :class="'w-full ' + estilos.alineado">
                {{ msj.usuario.nombre }}
            </div>
            <div :class="'font-light ' + estilos.alineado">
                {{ msj.mensaje }}
            </div>
        </div>
    </div>
</template>

<script setup>

import { computed } from 'vue'
import localUser from '../utils/localUser.js';

const props = defineProps({
    msj: Object
})

const estilos = computed(() => {

    if (props.msj.usuario._id === localUser().id) {
        return {
            color: 'bg-jade-300 border-jade-400',
            lado: 'flex flex-row-reverse',
            alineado: 'text-right'
        }
    } else {
        return {
            color: 'bg-jade-100 border-jade-200',
            lado: 'flex flex-row',
            alineado: ''
        }
    }
})

</script>
