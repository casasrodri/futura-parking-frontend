<template>
    <div id="selectores" class="flex gap-1 p-1 mx-auto my-1 items-center justify-between max-w-md">

        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-50 rounded-lg" role="group">
            <button @click="cambiarRuta({ accion: 'necesito' })"
                :class="'text-center px-5 py-1.5 text-xs font-medium rounded-lg ' + estilos.necesito">
                Necesito
            </button>

            <button @click="cambiarRuta({ accion: 'ofrezco' })"
                :class="'text-center px-5 py-1.5 text-xs font-medium rounded-lg ' + estilos.ofrezco">
                Ofrezco
            </button>
        </div>

        <div class="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-50 rounded-lg" role="group">
            <button @click="cambiarRuta({ quien: 'otros' })"
                :class="'text-center px-3 py-1.5 text-xs font-medium rounded-lg ' + estilos.otros">
                <i class="bi bi-people-fill"></i>
            </button>

            <button @click="cambiarRuta({ quien: 'yo' })"
                :class="'text-center px-3 py-1.5 text-xs font-medium rounded-lg ' + estilos.yo">
                <i class="bi bi-person-fill"></i>
            </button>
        </div>
    </div>

    <div class="text-xs ml-6 -my-1 text-teal-800">
        {{ textoVariable }}
        <br>
        <!-- {{ filtros }} -->
        <!-- {{ $route.fullPath }} -->

        <!-- {{ filtros }} -->
    </div>

    <!-- Botón de nuevo -->
    <div v-if="$route.params.tipoVis === 'mias'" class="flex w-full bottom-20 fixed place-content-end">
        <CardNuevo texto="Nueva" :to="{ name: 'publicacionesAlta' }" />
    </div>
</template>

<script setup>

import CardNuevo from './CardNuevo.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const estilosDefault = {
    necesito: 'text-gray-800',
    ofrezco: 'text-gray-800',
    yo: 'text-gray-800',
    otros: 'text-gray-800',
}

const estilosSeleccionados = {
    necesito: 'text-white bg-jade-600',
    ofrezco: 'text-white bg-jade-600',
    yo: 'text-white bg-blue-500',
    otros: 'text-white bg-blue-500',
}

const textosVariables = {
    ofrezcoyo: 'Estas son las ofertas de cocheras que realizaste:',
    necesitootros: 'Otros usuarios están ofreciendo las siguientes cocheras:',
    necesitoyo: 'Eston son los pedidos de cocheras que realizaste:',
    ofrezcootros: 'Otros usuarios están buscando alquilar cocheras:',
}

const rutasDestino = {
    necesitootros: { tipoPub: 'ofertas', tipoVis: 'otros' },
    ofrezcootros: { tipoPub: 'demandas', tipoVis: 'otros' },
    necesitoyo: { tipoPub: 'demandas', tipoVis: 'mias' },
    ofrezcoyo: { tipoPub: 'ofertas', tipoVis: 'mias' },
}

const estilos = ref({ ...estilosDefault })
const textoVariable = ref('')
const route = useRoute()
const router = useRouter()

const filtros = ref({ accion: 'necesito', quien: 'otros' })

function cambiarRuta(obj) {
    filtros.value = { ...filtros.value, ...obj }
    const params = rutasDestino[filtros.value.accion + filtros.value.quien]

    router.push({ name: 'publicacionesList', params })
}

function pintarSelector() {
    estilos.value = { ...estilosDefault }
    estilos.value[filtros.value.accion] = estilosSeleccionados[filtros.value.accion]
    estilos.value[filtros.value.quien] = estilosSeleccionados[filtros.value.quien]
}

function cambiarTextoVariable() {
    textoVariable.value = textosVariables[filtros.value.accion + filtros.value.quien]
}

function adaptarSelectorRuta() {
    switch (route.fullPath) {
        case '/publicaciones/ofertas/otros':
            filtros.value = { accion: 'necesito', quien: 'otros' }
            break;
        case '/publicaciones/demandas/otros':
            filtros.value = { accion: 'ofrezco', quien: 'otros' }
            break;
        case '/publicaciones/demandas/mias':
            filtros.value = { accion: 'necesito', quien: 'yo' }
            break;
        case '/publicaciones/ofertas/mias':
            filtros.value = { accion: 'ofrezco', quien: 'yo' }
            break;
    }

    cambiarTextoVariable()
    pintarSelector()
}

onMounted(() => {
    adaptarSelectorRuta()
})

watch(route, () => {
    if (route.name === 'publicacionesList') {
        adaptarSelectorRuta()
    }
})


</script>
