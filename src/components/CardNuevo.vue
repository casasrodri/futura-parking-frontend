<template>
    <RouterLink :to="to">
        <div class="max-w-full flex flex-col items-center justify-center m-2">

            <button type="button"
                class="text-white bg-jade-500 hover:bg-jade-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                <i class="bi bi-plus-circle-fill mr-2"></i>
                {{ texto }}
            </button>
        </div>
    </RouterLink>
</template>

<script setup>

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    texto: String,
    to: Object,
})

</script>

