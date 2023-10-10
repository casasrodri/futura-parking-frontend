<template>
    <!-- <HeaderMenu /> -->


    Pruebas




    <input type="color" v-model="selectedColor" />

    <p class='text-2xl' :style="{ color: selectedColorWithOpacity }">
        TEXTO DE COLOR
        {{ color }}
        {{ selectedColorWithOpacity }}
    </p>


    <!-- <FooterMenu /> -->
</template>



<script setup>


import FooterMenu from '../components/FooterMenu.vue';
import HeaderMenu from '../components/HeaderMenu.vue';
import MenuUsuario from '../components/MenuUsuario.vue';

import { ref, reactive, onMounted, computed } from 'vue';
import Cookies from '../utils/cookies.js'

const selectedColor = ref('#00000')

const selectedColorWithOpacity = computed(() => {
    const r = parseInt(selectedColor.value.slice(1, 3), 16)
    const g = parseInt(selectedColor.value.slice(3, 5), 16)
    const b = parseInt(selectedColor.value.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, 0.60)`;
})





// onMounted(() => {
//     Cookies.set('Usuarios', 'Rodrigo Casas', '2023-10-09 14:47:00')

//     const cookiesNavegador = Cookies.getAll()
//     console.log(cookiesNavegador)
//     todasCookies.value = cookiesNavegador

//     const una = Cookies.get('Usuarios')
//     unaCookie.value = una

//     Cookies.delete('Usuariossssss')ctivo)

</script>


<style>
</style>
