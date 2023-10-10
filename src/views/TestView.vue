<template>
    <HeaderMenu />

    Texto de ejemplosdfsdf

    sdf
    df
    sd
    f
    sd
    f

    <!-- Menú flotante -->
    <MenuUsuario :activo="true" />

    dsfsdf

    sd
    fsd
    fsd
    f

    <FooterMenu />
</template>



<script setup>


import FooterMenu from '../components/FooterMenu.vue';
import HeaderMenu from '../components/HeaderMenu.vue';
import MenuUsuario from '../components/MenuUsuario.vue';

import { ref, reactive, onMounted } from 'vue';
import Cookies from '../utils/cookies.js'





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
