<template>
    <div id="selectores" class="flex gap-1 p-1 mx-auto my-1 items-center justify-between max-w-md">

        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-50 rounded-lg" role="group">
            <RouterLink :to="{ name: 'publicacionesList', params: { tipoPub: 'ofertas' } }"
                :class="'text-center px-5 py-1.5 text-xs font-medium rounded-lg ' + estilos.ofertas">
                Necesito
            </RouterLink>

            <RouterLink :to="{ name: 'publicacionesList', params: { tipoPub: 'demandas' } }"
                :class="'text-center px-5 py-1.5 text-xs font-medium rounded-lg ' + estilos.demandas">
                Ofrezco
            </RouterLink>
        </div>

        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-50 rounded-lg" role="group">
            <RouterLink :to="{ name: 'publicacionesList', params: { tipoVis: 'otros' } }"
                :class="'text-center px-3 py-1.5 text-xs font-medium rounded-lg ' + estilos.otros">
                <i class="bi bi-people-fill"></i>
            </RouterLink>

            <RouterLink :to="{ name: 'publicacionesList', params: { tipoVis: 'mias' } }"
                :class="'text-center px-3 py-1.5 text-xs font-medium rounded-lg ' + estilos.mias">
                <i class="bi bi-person-fill"></i>
            </RouterLink>
        </div>
    </div>

    <!-- Botón de nuevo -->
    <div v-if="$route.params.tipoVis === 'mias'" class="flex w-full bottom-20 fixed place-content-end">
        <CardNuevo texto="Nueva" :to="{ name: 'publicacionesAlta' }" />
    </div>
</template>

<script setup>

import CardNuevo from './CardNuevo.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const estilosDefault = {
    ofertas: 'text-gray-800',
    demandas: 'text-gray-800',
    mias: 'text-gray-800',
    otros: 'text-gray-800',
}

const estilosSeleccionados = {
    ofertas: 'text-white bg-jade-600',
    demandas: 'text-white bg-jade-600',
    mias: 'text-white bg-blue-500',
    otros: 'text-white bg-blue-500',
}

const estilos = ref({ ...estilosDefault })
const route = useRoute()

function pintarSelector() {
    estilos.value = { ...estilosDefault }
    estilos.value[route.params.tipoPub] = estilosSeleccionados[route.params.tipoPub]
    estilos.value[route.params.tipoVis] = estilosSeleccionados[route.params.tipoVis]
}

onMounted(() => {
    pintarSelector()
})

watch(route, () => {
    if (route.name === 'publicacionesList') {
        pintarSelector()
    }
})


</script>
