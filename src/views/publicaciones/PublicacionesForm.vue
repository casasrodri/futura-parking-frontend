<template>
    <h2>FORMULARIO</h2>


    <form @submit.prevent="btnFuncion">

        <template v-if="$route.name !== 'publicacionesAlta'">
            <br>
            <label for="estado">Estado</label>
            <select v-model="publi.estado">
                <option value="disponible">Disponible</option>
                <option value="finalizada">Finalizada</option>
            </select>

            <br>
            Tipo: {{ publi.tipo }}
        </template>
        <template v-else>
            <br>
            <label for="tipo">Tipo</label>
            <select v-model="publi.tipo">
                <option value="oferta">Oferta</option>
                <option value="demanda">Solicitud</option>
            </select>
        </template>



        <br>
        <label for="ini">Inicio:</label>
        <input type="datetime-local" v-model="publi.ini" />

        <br>
        <label for="fin">Fin:</label>
        <input type="datetime-local" v-model="publi.fin" :min="publi.ini" />

        <br>
        <label for="observaciones">Observaciones:</label>
        <textarea v-model="publi.observaciones" placeholder="Observaciones"></textarea>

        <div v-if="publi.tipo === 'oferta'">
            <br>
            <label for="tipo">Cochera:</label>
            <!-- FIXME Ver como agregar el _id para que al editar aparezca por defecto -->
            <select v-model="publi.cochera">
                <option v-for="coch in cocherasPropietario" :key="coch._id" :value="coch._id">
                    {{ coch.numero }} ({{ coch.tipo }})
                </option>
            </select>
        </div>
        <div v-if="publi.tipo === 'demanda'">
            <br>
            <label for="tipo">Vehículo:</label>
            <!-- FIXME Ver como agregar el _id para que al editar aparezca por defecto -->
            <select v-model="publi.demanda.vehiculo">
                <option v-for="vehi in vehiculosPropietario" :key="vehi._id" :value="vehi._id">
                    {{ vehi.alias }} ({{ vehi.patente }})
                </option>
            </select>
        </div>

        <br>
        <button type="submit">{{ btnGuardar }}</button>
    </form>

    <br><br>
    {{ errores }}

    <br><br>
    {{ publiGuardar }}

    <br><br>
    {{ localUser() }}
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Publicacion from '../../api/publicaciones.js'

const router = useRouter()
const errores = ref([])
const publi = ref({ tipo: '', estado: 'disponible', oferta: {}, demanda: {} })
// const publi = reactive({ tipo: '', estado: 'disponible', oferta: {}, demanda: {} })

const actualizar = async () => {
    alert('Se está actualizando la publicación...')
    const res = await Publicacion.update(publi.value._id, publiGuardar.value)
    console.log(res)
    alert('Actualizada!!')
    router.push({ name: 'misPublicaciones' })
}

const publiGuardar = computed(() => {
    const guardar = { ...publi.value }
    guardar.creador = localUser().id
    // guardar.estado = 'disponible'

    if (publi.value.tipo === 'oferta') {
        guardar.cochera = publi.value.cochera
        guardar.precio = publi.value.precio
    } else {
        guardar.vehiculo = publi.value.demanda.vehiculo
    }

    return guardar
})

const cocherasPropietario = ref([])
const vehiculosPropietario = ref([])

const registrar = async () => {
    alert('Se está creando la nueva publicación...')
    const res = await Publicacion.create(publiGuardar.value)
    console.log(res)
    alert('Creada!!')
    router.push({ name: 'misPublicaciones' })
}

const btnGuardar = ref('Actualizar')
const btnFuncion = ref(actualizar)
const routes = useRoute()

import Cochera from '../../api/cocheras.js'
import Vehiculo from '../../api/vehiculos.js'
import localUser from '../../utils/localUser.js';
import { fechaHoraISO } from '../../utils/formats.js';

onMounted(async () => {

    if (routes.name === 'publicacionesAlta') {
        console.log('alta')
        btnGuardar.value = 'Registrar'
        btnFuncion.value = registrar

    } else {
        console.log('editar')
        const res = await Publicacion.get(routes.params.id)
        const publicacion = { ...res.data }

        publicacion.demanda = {
            vehiculo: publicacion.vehiculo ? publicacion.vehiculo._id : ''
        }

        publicacion.oferta = {
            cochera: publicacion.cochera ? publicacion.cochera._id : '',
            precio: publicacion.cochera ? publicacion.precio : ''
        }

        // Convertir las horas a formato date y time
        publicacion.ini = fechaHoraISO(publicacion.ini)
        publicacion.fin = fechaHoraISO(publicacion.fin)

        publi.value = publicacion
    }

    const { data: dataCocheras } = await Cochera.obtenerDelPropietario()
    cocherasPropietario.value = dataCocheras

    const { data: dataVehiculos } = await Vehiculo.obtenerDelPropietario()
    vehiculosPropietario.value = dataVehiculos

})

// eslint-disable-next-line no-unused-vars
// watch(tipoNuevaPubli, async (nuevo, anterior) => {
//     if (nuevo.tipo === 'oferta') {
//         const { data } = await Cochera.obtenerDelPropietario()
//         cocherasPropietario.value = data
//     } else {
//         const { data } = await Vehiculo.obtenerDelPropietario()
//         vehiculosPropietario.value = data
//     }
// })

</script>

