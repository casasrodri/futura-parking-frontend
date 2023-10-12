<template>
    <div class="mt-5">
        <template v-if="conversaciones.length === 0">
            <div class="text-center text-gray-600 mt-8">
                <span class="text-jade-300">
                    <i class="bi bi-chat-square-text text-6xl"></i>
                </span>
                <p class="mt-4 text-jade-600">No has iniciado conversaciones...</p>
            </div>
        </template>

        <template v-else>
            <template v-for="conv in conversaciones" :key="conv._id">
                <template v-if="conv.oferente._id != localUser().id">
                    <CardMensaje :nombre="`${conv.oferente.nombre} ${conv.oferente.apellido}`" :cantidad="conv.noLeidos"
                        :idConversacion="conv._id" :idPublicacion="conv.publicacion._id" />
                </template>

                <template v-if="conv.demandante._id != localUser().id">
                    <CardMensaje :nombre="`${conv.demandante.nombre} ${conv.demandante.apellido}`" :cantidad="conv.noLeidos"
                        :idConversacion="conv._id" :idPublicacion="conv.publicacion._id" />
                </template>
            </template>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Conversacion from '../../api/conversaciones.js'
import localUser from '../../utils/localUser.js';

import CardMensaje from '../../components/CardMensaje.vue';

const conversaciones = ref({})

onMounted(async () => {
    const miUsuario = localUser().id
    const { data } = await Conversacion.obtenerDelUsuario(miUsuario)

    for (const conversacion of data) {
        const { data: noLeidos } = await Conversacion.contarMensajesNoLeidos(conversacion._id, miUsuario)
        conversacion.noLeidos = noLeidos.length
    }

    conversaciones.value = data
})

</script>
