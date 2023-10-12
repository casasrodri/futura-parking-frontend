<template>
    <HeaderMenu />
    <div class="pt-[54px] pb-[96px]">
        <RouterView />
    </div>
    <FooterMenu />
</template>

<script setup>


import HeaderMenu from '../components/HeaderMenu.vue';
import FooterMenu from '../components/FooterMenu.vue';



import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import localUser from '../utils/localUser.js'

const router = useRouter()
const route = useRoute()

function redireccionarLogin() {
    if (!localUser().id && route.name !== 'signup')
        router.push({ name: 'login' })
}

onMounted(async () => {
    redireccionarLogin()
    setInterval(() => {
        redireccionarLogin()
    }, 10 * 1000) // Segundos
})

</script>

