<template>
    <RouterLink :to="{ path: '/conversaciones/' + idConversacion }">
        <div
            class="border-2 flex flex-row justify-between items-center align-middle max-w-md rounded-lg h-12 my-2 mx-2 w-96">
            <div class="flex items-center justify-center h-full align-middle w-14 text-xl bg-jade-100 text-jade-400">
                <i class="bi bi-chat-fill"></i>
            </div>
            <div class="flex items-center self-start bg-jade-50 h-full w-full pl-3">
                {{ nombre }}

                <span class="bg-gray-100 text-gray-700 text-xs font-medium mr-2 px-2 py-0.5 rounded-full ml-2"
                    v-if="idPublicacion">
                    <span class="text-gray-500">
                        #
                    </span>
                    {{ idPublicacion.slice(-4) }}
                </span>
            </div>
            <div class="flex items-center justify-center h-full px-4 align-middle bg-jade-50">
                <span class="bg-red-600 text-white text-xs px-2 py-1 rounded-full" v-if="cantidad">
                    {{ cantidad }}
                </span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>

const props = defineProps({
    nombre: String,
    cantidad: Number,
    idConversacion: String,
    idPublicacion: String
})

</script>
