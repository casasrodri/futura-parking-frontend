<template>
    <div class="w-auto mx-auto flex flex-col items-center mt-16">

        <div class="brightness-110 drop-shadow-xl w-1/2 mx-auto opacity-70">
            <img src="/icon.svg" alt="Descripción de la imagen">
        </div>

        <div class="inline-block font-montserrat text-jade-600 font-medium text-4xl mt-10 drop-shadow-xl">
            Futura Parking
        </div>

        Bienvenido: {{ enviromentVar }}
    </div>
</template>

<script setup>

const enviromentVar = import.meta.env.VITE_BIENVENIDO
</script>
