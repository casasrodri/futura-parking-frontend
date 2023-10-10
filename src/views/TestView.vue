<template>
    <!-- <HeaderMenu /> -->


    <a href="#"
        class="m-2 max-w-sm p-5 pb-3 bg-white border border-jade-200 rounded-lg shadow hover:bg-jade-100 hover:border-jade-400 hover:shadow-md flex flex-col items-center justify-center">

        <h5 class="block mb-2 text-2xl font-bold tracking-tight text-jade-800">
            Subterránea
        </h5>

        <div id="fechas" class="flex flex-row w-full px-5 mt-2 items-center justify-between">
            <div id="ini" class="flex flex-col items-center justify-between">
                <div>
                    14/03/2021
                </div>
                <div class="text-gray-500 font-light">
                    13:33
                </div>
            </div>

            <div id="flecha" class="text-3xl text-gray-400">
                <i class="bi bi-arrow-right"></i>
            </div>

            <div id="ini" class="flex flex-col items-center justify-between">
                <div>
                    31/03/2022
                </div>
                <div class="text-gray-500 font-light">
                    12:21
                </div>
            </div>
        </div>

        <h3 class="block mt-3 text-lg font-medium tracking-tight text-gray-900">
            Rodri Casas
        </h3>
    </a>






    <!-- <FooterMenu /> -->
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
