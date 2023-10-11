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
import { useRouter } from 'vue-router'
import localUser from '../utils/localUser.js'

const router = useRouter()

onMounted(async () => {
    setInterval(() => {
        if (!localUser().id) router.push({ name: 'login' })
    }, 10 * 1000)
})

</script>

