<template>
    <HeaderSesion />

    <div class="flex items-center justify-center text-9xl my-10 text-jade-300">
        <i class="bi bi-person-fill-check"></i>
        <!-- <i class="bi bi-person-fill-slash"></i> -->
    </div>

    <form @submit.prevent="ingresar" class="mx-10">
        <div class="relative z-0 w-full mb-6 group">
            <input type="email" name="floating_email" id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="email" />
            <label for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="password" name="floating_password" id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="password" />
            <label for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Contraseña
            </label>
        </div>

        <button type="submit"
            class="text-white bg-jade-700 hover:bg-jade-800 focus:ring-4 focus:outline-none focus:ring-jade-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Ingresar
        </button>
    </form>

    <div class="flex items-center justify-center my-10 text-jade-800">
        <RouterLink :to="{ name: 'signup' }">Registrarse</RouterLink>
    </div>

    <!-- {{ email }} -->
    <!-- {{ password }} -->

    Bienvenido: {{ enviromentVar }}
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../../api/jwt.js'
import localUser from '../../utils/localUser.js'
import HeaderSesion from '../../components/HeaderSesion.vue'

const router = useRouter()
const enviromentVar = import.meta.env.VITE_BIENVENIDO
const email = ref('')
const password = ref('')

onMounted(async () => {
    if (localUser().id) router.push({ name: 'home' })
})

const ingresar = async () => {
    try {
        const logged = await login(email.value, password.value)
        if (logged) router.push({ name: 'home' })
    } catch (e) {
        console.log(e)
    }
}

</script>

