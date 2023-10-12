<template>
    <HeaderSesion />

    <div class="flex items-center justify-center text-9xl my-10 text-jade-300">
        <i class="bi bi-person-fill-add"></i>
    </div>


    <form @submit.prevent="register" class="mx-10">
        <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_nombre" id="floating_nombre"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.nombre" />
            <label for="floating_nombre"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nombre
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_apellido" id="floating_apellido"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.apellido" />
            <label for="floating_apellido"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Apellido
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="email" name="floating_email" id="floating_email"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.email" />
            <label for="floating_email"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="password" name="floating_password" id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.password" />
            <label for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Contraseña
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="password" name="floating_password" id="floating_password"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.repassword" />
            <label for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Repetir contraseña
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="tel" name="floating_telefono" id="floating_telefono"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.telefono" />
            <label for="floating_telefono"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Celular (sin 0 ni 15)
            </label>
        </div>

        <div class="relative z-0 w-full mb-6 group">
            <input type="text" name="floating_cbu" id="floating_cbu"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-jade-600 peer"
                placeholder=" " required v-model="nuevoUsuario.cbu" />
            <label for="floating_cbu"
                class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-jade-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                CBU/Alias
            </label>
        </div>

        <button type="submit"
            class="text-white bg-jade-700 hover:bg-jade-800 focus:ring-4 focus:outline-none focus:ring-jade-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            Registrarse
        </button>
    </form>

    <div class="flex items-center justify-center my-10 text-jade-800">
        <RouterLink :to="{ name: 'login' }">Iniciar sesión</RouterLink>
    </div>

    <!-- {{ errores }} -->
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../api/index.js'
import HeaderSesion from '../../components/HeaderSesion.vue'
import localUser from '../../utils/localUser.js'

const router = useRouter()
const nuevoUsuario = ref({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    repassword: '',
    cbu: ''
})
const errores = ref([])

const register = async () => {
    try {
        const res = await post('/api/usuarios', nuevoUsuario.value)
        console.log(res)

        if (res.status === 200) {
            router.push({ name: 'login' })
        }
    } catch (error) {
        console.log(error.response.data)
        errores.value = error.response.data
    }
}

onMounted(async () => {
    if (localUser().id) router.push({ name: 'home' })
})

</script>

